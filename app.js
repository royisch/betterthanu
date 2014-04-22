angular.module('App', [
            'ngRoute',
            'ui.bootstrap'
        ])
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl: './partials/login.html',
                        controller:'splashCtrl'
                    }).
                    when('/inside', {
                        templateUrl: './partials/index.html',
                        controller: 'DemoCtrl'
                    }).
                    otherwise({
                        redirectTo: '/'
                    });
        }]);

