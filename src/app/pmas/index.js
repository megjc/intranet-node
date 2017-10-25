(function() {
    'use strict'
    angular.module('apps.pmas', []).config(config)
    function config($routeProvider){
      $routeProvider.when('/dashboard/apps/pmas/plans', {
        controller: 'Plan as vm',
        title: 'PMAS Workplans',
        templateUrl: 'views/apps/pmas/plan-list.html',
        access: { restricted: true}
      }).when('/dashboard/apps/pmas/plans/:id/work-plan', {
        controller: 'ViewPlan as vm',
        title: 'View Workplan',
        templateUrl: 'views/apps/pmas/plan-view.html',
        access: { restricted: true}
      }).when('/dashboard/apps/pmas/plans/:id/resource-needs', {
        controller: 'Resource as vm',
        title: 'View Workplan',
        templateUrl: 'views/apps/pmas/plan-resource.html',
        access: { restricted: true}
      }).when('/dashboard/apps/pmas/plans/:id/work-plan-changes', {
        controller: 'WorkPlanChanges as vm',
        title: 'Workplan Changes',
        templateUrl: 'views/apps/pmas/plan-changes.html',
        access: { restricted: true}
      }).when('/dashboard/apps/pmas/plans/:id/notifications', {
        controller: 'Notification as vm',
        title: 'Workplan Notifications',
        templateUrl: 'views/apps/pmas/plan-notifications.html',
        access: { restricted: true}
      })
    }
})();
