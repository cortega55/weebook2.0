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
  return $resource('/books/:id',
     {id: '@id'},
     {update: { method: 'PATCH'}});
}]);

weebookApp.factory('User', ['$resource', function($resource) {
  var userAccountId = $("#defaultContainer").data("user-id");
  return $resource('/users/:id',
     {id: userAccountId},
     {update: { method: 'PATCH'}});
}]);


weebookApp.controller('BookCtrl', ['$scope','Book', 'User', function($scope, Book, User) {

    $scope.books= [];

    $scope.newBook = new Book();

    $scope.shoppingcart = [];
    

    Book.query(function(books) {
      $scope.books = books;
    });

    User.get(function(users) {
      $scope.users = users;
    });

    $scope.addItemToCart = function (book) {
      $scope.shoppingcart.unshift(book); 
      console.log($scope.shoppingcart)
          
    }

    $scope.saveBook = function () {
      $scope.newBook.$save(function(book) {
        $scope.books.unshift(book);
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
    }

}]);
