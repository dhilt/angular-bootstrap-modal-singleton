angular-bootstrap-modal-singleton
================

The main reason for undestroyable $modal factory usage is the memory leakages removal.

See [sample demo](http://rawgit.com/dhilt/angular-bootstrap-modal-singleton/master/sample/localView.html). There are two different examples of "modalDialogs" factory usages, a second level factories ("confirmation" and "someDialogService") with and without $scope passing.

dhilt, 2015
