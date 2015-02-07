/*
* generated from original coffee source by http://js2coffee.thomaskalka.de/
* source: https://github.com/dhilt/angular-bootstrap-modal-singleton
* dhilt, 2015
* */

var __hasProp = Object.prototype.hasOwnProperty;
angular.module("angular-bootstrap-modal-singleton", []).factory('modalDialogs', [
	'$modal', '$document', '$templateCache', function($modal, $document, $templateCache) {
		var bodyElement, commonTemplateId, configure, dialogList, getTemplate, hideAllDialogs, hideDialog, instance, linking, modalBackdrop, modalBackdropParent, modalBackdropZIndex, openDialog, showDialog;
		dialogList = [];
		commonTemplateId = 'ModalDialogTemplateId';
		bodyElement = null;
		modalBackdrop = null;
		modalBackdropParent = null;
		modalBackdropZIndex = null;
		getTemplate = function(self) {
			return '\
						<div>\
							<div class="modal-header">\
								<h4><span class="glyphicon {{uiData.iconClass}}"></span>\
									{{uiData.title}}\
								</h4>\
							</div>\
\
							<div class="modal-body">' + $templateCache.get(self.id + commonTemplateId) + '</div>\
\
							<div class="modal-footer text-center">\
								<span ng-repeat="action in uiData.actions">\
									<button class="btn {{action.btnClass}}" ng-click="action.do()">\
										<span class="glyphicon {{action.iconClass}}" ng-show="action.iconClass"></span>\
										{{action.caption}}\
									</button>\
								</span>\
							</div>\
						</div>';
		};
		configure = function(configObj) {
			var action, i, key, self, val, _ref, _ref2;
			self = this;
			self.uiData = {};
			self.autoClose = configObj.hasOwnProperty('autoClose') ? configObj.autoClose : true;
			self.onBeforeClose = configObj.onBeforeClose;
			self.uiData.data = {};
			_ref = configObj.data;
			for (key in _ref) {
				if (!__hasProp.call(_ref, key)) continue;
				val = _ref[key];
				self.uiData.data[key] = val;
			}
			self.uiData.windowClass = configObj.windowClass || '';
			self.uiData.iconClass = configObj.iconClass || '';
			self.uiData.title = configObj.title || '';
			self.uiData.actions = [];
			for (i = 0, _ref2 = configObj.actions.length - 1; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
				action = configObj.actions[i];
				self.uiData.actions.push({
					index: i,
					btnClass: action.btnClass || '',
					iconClass: action.iconClass || '',
					caption: action.caption || 'Do' + (i > 0 ? i + 1 : ''),
					"do": function() {
						hideDialog(self);
						if (typeof configObj.actions[this.index]["do"] === 'function') {
							return configObj.actions[this.index]["do"]();
						}
					}
				});
			}
			if (self.scope) {
				self.scope.uiData = self.uiData;
			}
			return self;
		};
		showDialog = function(self) {
			self.isDialogOpened = true;
			bodyElement.addClass('modal-open');
			if (modalBackdropParent.show) {
				modalBackdropParent.show();
				return self.modalWindowParent.show(100);
			} else {
				modalBackdropParent.css('display', 'block');
				return self.modalWindowParent.css('display', 'block');
			}
		};
		hideDialog = function(self) {
			self.isDialogOpened = false;
			if (modalBackdropParent.hide) {
				modalBackdropParent.hide();
				self.modalWindowParent.hide(100);
			} else {
				modalBackdropParent.css('display', 'none');
				self.modalWindowParent.css('display', 'none');
			}
			bodyElement.removeClass('modal-open');
			if (typeof self.onBeforeClose === 'function') {
				return self.onBeforeClose();
			}
		};
		hideAllDialogs = function(force) {
			var dlg, _i, _len;
			for (_i = 0, _len = dialogList.length; _i < _len; _i++) {
				dlg = dialogList[_i];
				if (!dlg.isDialogOpened) {
					continue;
				}
				if (!force && !dlg.autoClose) {
					return;
				}
				hideDialog(dlg);
				return true;
			}
		};
		linking = function(self) {
			var elt, handleClick, handleEscDown, modalWindow, modalWindows, _i, _len;
			bodyElement = bodyElement || angular.element(document).find('body');
			modalBackdrop = angular.element(document.querySelector('[modal-backdrop]'));
			modalBackdropZIndex = modalBackdropZIndex || parseInt(modalBackdrop.css('z-index'), 10);
			modalBackdrop.css('z-index', modalBackdropZIndex);
			if (!modalBackdropParent) {
				modalBackdrop.wrap('<div id="modalBackDropParentId">');
				modalBackdropParent = modalBackdrop.parent();
				handleEscDown = function(event) {
					if (event.which !== 27) {
						return;
					}
					if (!hideAllDialogs()) {
						return;
					}
					event.stopPropagation();
					return event.preventDefault();
				};
				$document.bind('keydown', handleEscDown);
			}
			modalWindows = angular.element(document.querySelectorAll('[modal-window]'));
			for (_i = 0, _len = modalWindows.length; _i < _len; _i++) {
				modalWindow = modalWindows[_i];
				if (modalWindow.parentElement.nodeName === "BODY") {
					elt = angular.element(modalWindow);
					elt.wrap('<div id="' + self.id + commonTemplateId + '">');
					self.modalWindowParent = elt.parent();
					break;
				}
			}
			if (self.autoClose) {
				handleClick = function(event) {
					if (event.target.hasAttribute('modal-window') || event.target.parentElement.hasAttribute('modal-window')) {
						if (!hideAllDialogs()) {
							return;
						}
						event.stopPropagation();
						return event.preventDefault();
					}
				};
				self.modalWindowParent.bind('click', handleClick);
				return self.scope.$on('$destroy', function() {
					return self.modalWindowParent.unbind('click', handleClick);
				});
			}
		};
		openDialog = function() {
			var self;
			self = this;
			if (self.isInitialized) {
				showDialog(self);
				return;
			}
			self.isInitialized = true;
			return $modal.open({
				template: getTemplate(self),
				windowClass: self.uiData.windowClass,
				backdrop: self.uiData.backdrop || 'static',
				keyboard: false,
				controller: function($scope, $modalInstance) {
					self.scope = $scope;
					$scope.uiData = self.uiData;
					return $modalInstance.opened.then(function() {
						linking(self);
						return showDialog(self);
					});
				}
			});
		};
		instance = function(id) {
			var dlg, newDlg, _i, _len;
			for (_i = 0, _len = dialogList.length; _i < _len; _i++) {
				dlg = dialogList[_i];
				if (dlg.id === id) {
					return dlg;
				}
			}
			newDlg = {
				id: id,
				isInitialized: false,
				isDialogOpened: false,
				self: {},
				configure: configure,
				openDialog: openDialog
			};
			dialogList.push(newDlg);
			return newDlg;
		};
		return {
			commonTemplateId: commonTemplateId,
			instance: instance,
			hideAllDialogs: hideAllDialogs
		};
	}
]);