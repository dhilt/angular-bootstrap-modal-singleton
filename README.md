angular-bootstrap-modal-singleton
================

See [sample demo](http://rawgit.com/dhilt/angular-bootstrap-modal-singleton/master/sample/localView.html). There are two different samples of "modalDialogs" factory usage: a second level factories ("confirmation" and "someDialogService") with and without $scope passing. I did't even try to create any documentation and hope these samples can provide enough information... The code of modalDialogs factory is quite dirty because of destroying prevention and DOM-oriented hiding/showing. It's just a concept.

So one of the main reason for undestroyable $modal factory usage was the ui.bootstrap $modal memory leakages removal. But this issue had been resolved within ui.bootstrap some time ago (in 0.12.0 release). 

dhilt, 2015
