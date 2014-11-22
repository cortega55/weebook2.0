var weebookApp = angular.module('weebook-app', ['ngResource', 'ui.router', 'templates' ]).config(
    ['$httpProvider', function($httpProvider) {
    var authToken = angular.element("meta[name=\"csrf-token\"]").attr("content");
    var defaults = $httpProvider.defaults.headers;

    defaults.common["X-CSRF-TOKEN"] = authToken;
    defaults.patch = defaults.patch || {};
    defaults.patch['Content-Type'] = 'application/json';
    defaults.common['Accept'] = 'application/json';
}]);

weebookApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "home.html"
    })
    .state('books', {
      url: "/books",
      templateUrl: "books.html"
     })
    .state('sell', {
      url: "/sell",
      templateUrl: "sell.html"
     })
    .state('profile', {
      url: "/profile",
      templateUrl: "profile.html"
     })
    .state('checkout', {
      url: "/checkout",
      templateUrl: "checkout.html"
     })

   });

weebookApp.factory('Book', ['$resource', function($resource) {
  return $resource('/jobs/:id',
     {id: '@id'},
     {update: { method: 'PATCH'}});
}]);

weebookApp.factory('User', ['$resource', function($resource) {
  return $resource('/users/:id',
     {id: '@id'},
     {update: { method: 'PATCH'}});
}]);


weebookApp.controller('BookCtrl', ['$scope','Book', 'User', function($scope, Book, User) {

    $scope.books= [];

    $scope.newBook = new Book();

    Book.query(function(books) {
      $scope.books = books;
    });

    User.query(function(users) {
      $scope.users = users;
    });

    $scope.saveBook = function () {
      $scope.newBook.$save(function(book) {
        $scope.books.unshift(book)
        $scope.newBook = new Book();
      });
    }

    $scope.deleteBook = function(book) {
      book.$delete(function() {
        position = $scope.books.indexOf(book);
        $scope.books.splice(position, 1);
      });
    }

    $scope.showBook = function(book) {
      book.details = true;
      // job.editing = false;
    }

    $scope.hideBook = function(book) {
      book.details = false;
    }

    $scope.editBook = function(book) {
      book.editing = true;
      book.details = false;
    }

    $scope.backBook = function(book) {
      book.editing = false;
    }

    $scope.updateBook = function(book) {
      book.$update(function() {
        book.editing = false;
      // }, function(errors) {
      //   $scope.errors = errors.data
      });
    };

    // $scope.clearErrors = function() {
    //   $scope.errors = null;
    // }
}]);

// var ModalCtrl = function ($scope, $modal, $log, $state) {

//   $scope.jobs = [];

//   $scope.open = function () {

//     var modalInstance = $modal.open({
//       templateUrl: 'myModalContent.html',
//       controller: ModalInstanceCtrl
//     });

//     modalInstance.result.then(function (newJob) {
//       newJob.$save(function(job) {
//         $state.reload();
//       });
//     }, function () {
//       $log.info('Modal dismissed at: ' + new Date());
//     });
//   };
// };

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

// var ModalInstanceCtrl = function ($scope, $modalInstance, Job) {

//    $scope.newJob = new Job();

//   $scope.ok = function () {
//     $modalInstance.close($scope.newJob);

//   };

//   $scope.cancel = function () {
//     $modalInstance.dismiss('cancel');
//   };
// };