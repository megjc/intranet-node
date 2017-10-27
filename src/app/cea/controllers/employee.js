(function() {
    'use strict';
    angular.module('apps.cea').controller('Employee', Employee)
    Employee.$inject = ['create', 'read', 'update', 'employees', 'permission', 'employeeSrv'];
    /* @ngInject */
    function Employee(create, read, update, employees, permission, employeeSrv) {
        var vm = this
        activate()
        vm.canCreate = create
        vm.canRead = read
        vm.canUpdate = update
        vm.employees = employees
        console.log(employees)
        function activate() { }

    }
})();
