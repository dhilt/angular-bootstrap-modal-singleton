angular-bootstrap-modal-singleton
================

See [sample demo](http://rawgit.com/dhilt/angular-bootstrap-modal-singleton/master/sample/localView.html). There are two different samples of "modalDialogs" factory usage: a second level factories ("confirmation" and "someDialogService") with and without $scope passing. I did't even try to create any documentation and hope these samples can provide enough information... The code of modalDialogs factory is quite dirty because of destroying prevention and DOM-oriented hiding/showing. It's just a conception.

So one of the main reason for undestroyable $modal factory usage is the memory leakages removal. Perhaps this situation has been changed but take a look for this leakage demo image, it was made via sample demo ui-bootstrap:

![alt tag](https://raw.githubusercontent.com/dhilt/angular-bootstrap-modal-singleton/master/leaks.png)

At last here is some related ui.bootstrap issue [$modal leaking DOM](https://github.com/angular-ui/bootstrap/issues/2875) which is not closed by the moment.

dhilt, 2015
