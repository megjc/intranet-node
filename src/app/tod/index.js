(function() {
    'use strict';

    angular.module('apps.tod', []).config(config)

        function config($routeProvider){
          $routeProvider.when('/dashboard/apps/tod/expired-docs', {
            templateUrl: 'views/apps/tod/expires-list.html',
            controller: 'ExpiryList as vm',
            title: 'Expired Documents',
            resolve: {
              officers: function(todSrv){
                return todSrv.getExpiredDocs()
              },
              create: function(permission){
                return permission.getByType('create')
              },
              read: function(permission){
                return permission.getByType('read')
              },
              update: function(permission){
                return permission.getByType('update')
              }
            },
            access: { restricted: true}
          }).when('/dashboard/apps/tod/officers', {
            templateUrl: 'views/apps/tod/officer-listing.html',
            controller: 'OfficerList as vm',
            title: 'Officer Listing',
            resolve: {
              officers: function(todSrv){
                return todSrv.getOfficers()
              },
              create: function(permission){
                return permission.getByType('create')
              },
              read: function(permission){
                return permission.getByType('read')
              },
              update: function(permission){
                return permission.getByType('update')
              }
            },
            access: { restricted: true}
          }).when('/dashboard/apps/tod/officers/new', {
            templateUrl: 'views/apps/tod/create-officer.html',
            controller: 'Officer as vm',
            title: 'Add New Officer',
            resolve: {
              allowances: function(todSrv){
                return todSrv.getAllowances()
              },
              classifications: function(todSrv){
                return todSrv.getClassifications()
              },
              activities: function(todSrv){
                return todSrv.getActivities()
              }
            },
            access: { restricted: true}
          }).when('/dashboard/apps/tod/officers/:id/edit', {
            templateUrl: 'views/apps/tod/edit-officer.html',
            controller: 'EditOfficer as vm',
            title: 'Edit Officer',
            access: { restricted: true},
            resolve: {
              allowances: function(todSrv){
                return todSrv.getAllowances()
              },
              classifications: function(todSrv){
                return todSrv.getClassifications()
              },
              activities: function(todSrv){
                return todSrv.getActivities()
              }
            },
          }).otherwise({redirectTo: '/login'})
        }
})();
