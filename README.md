angular-bootstrap-modal-singleton
================

See [sample demo](http://rawgit.com/dhilt/angular-bootstrap-modal-singleton/master/sample/localView.html). There are two different samples of "modalDialogs" factory usage: a second level factories ("confirmation" and "someDialogService") with and without $scope passing. I don't even try to create any documentation and hope these samples can provide enough information... The code of modalDialogs factory is quite dirty because of destroying prevention and DOM-oriented hiding/showing. It's just a conception.

So one of the main reason for undestroyable $modal factory usage is the memory leakages removal. Perhabs this situation has been changed but look at this leakage demo image which was created with sample demo ui-bootstrap sources:

![alt tag](https://raw.githubusercontent.com/dhilt/angular-bootstrap-modal-singleton/master/leaks.png)

dhilt, 2015
