angular.module('application', ['ui.bootstrap', 'angular-bootstrap-modal-singleton'])

	.factory("someDialogService",
	[ "modalDialogs", "$templateCache", "$rootScope", function (modalDialogs, $templateCache, $rootScope) {
		var bodyTemplate, configure, dialogInstanceId;
		dialogInstanceId = "reacquireLock";
		bodyTemplate = "This is the test dialog which can be closed only with Close buttons. And " +
			"<strong> {{ uiData.data.customText }} </strong>";

		$templateCache.put(dialogInstanceId + modalDialogs.commonTemplateId, bodyTemplate);

		configure = function ($scope) {
			return modalDialogs.instance(dialogInstanceId).configure({
				autoClose: false,
				title: "Some dialog title",
				windowClass: "modal-valign-middle",
				iconClass: "glyphicon-warning-sign",
				data: {
					customText: $scope.customText
				},
				actions: [
					{
						caption: "Close with alert",
						btnClass: "btn-default",
						"do": function () {
							alert('Close with alert')
						}
					},
					{
						caption: "Close with log",
						btnClass: "btn-default",
						"do": function () {
							console.log("Close with log");
						}
					},
					{
						caption: "Close without reaction",
						btnClass: "btn-primary"
					}
				],
				onBeforeClose: function () {
					$rootScope.$broadcast("someDialogWasClosed");
				}
			});
		};
		return {
			configure: configure
		};
	} ])

	.factory("confirmation",
	["modalDialogs", "$templateCache", function (modalDialogs, $templateCache) {
		var bodyTemplate, configure, dialogInstanceId;
		dialogInstanceId = "confirm";
		bodyTemplate = "{{ uiData.data.text }}";

		$templateCache.put(dialogInstanceId + modalDialogs.commonTemplateId, bodyTemplate);

		configure = function (options) {
			var configObject = {
				title: options.title || "Confirmation",
				windowClass: options.windowClass || "modal-valign-middle modal-confirm",
				iconClass: options.iconClass,
				data: {
					text: options.text || "Are you sure?"
				},
				actions: [
					{
						caption: options.cancelCaption || "Cancel",
						btnClass: options.cancelBtnClass || "btn-primary",
						iconClass: options.cancelIconClass
					},
					{
						caption: options.confirmCaption || "Confirm",
						btnClass: options.confirmBtnClass || "btn-default",
						iconClass: options.cancelIconClass,
						"do": options.confirmAction
					}
				]
			};
			return modalDialogs.instance(dialogInstanceId).configure(configObject);
		};
		return {
			configure: configure
		};
	} ])

	.controller('mainController',
	['$scope', '$log', 'someDialogService', 'confirmation', function ($scope, console, someDialogService, confirmation) {

		$scope.customText = "this message comes from ctrl scope.";

		$scope.showSomeDialog = function () {
			someDialogService.configure($scope).openDialog()
		};

		$scope.confirm = function () {
			return confirmation.configure({
				title: "Dialog approval",
				text: "Please confirm that the dialog appears",
				confirmAction: function () {
					alert('done!');
				}
			}).openDialog();
		};

	}
	]);

