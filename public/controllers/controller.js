var myApp = angular
    .module('myApp', [])
    .controller('AppCtrl', ['$http', function($http) {
        var vm = this;

        vm.title = 'This is a test';

        var refresh = function () {
            $http.get('/contactlist').success(function (response) {
                vm.contactlist = response;
                vm.contact = "";
            });
        };
        refresh();

        vm.addContact = function () {
            console.log(vm.contact);
            $http.post('/contactlist', vm.contact).success(function (response) {
                console.log(response);
                refresh();
            });
        };

        vm.remove = function (id) {
            console.log(id);
            $http.delete('/contactlist/' + id).success(function (response) {
                refresh();
            });
        };

        vm.edit = function (id) {
            console.log(id);
            $http.get('/contactlist/' + id).success(function (response) {
                vm.contact = response;
            });
        };

        vm.update = function () {
            console.log(vm.contact._id);
            $http.put('/contactlist/' + vm.contact._id, vm.contact).success(function (response) {
                refresh();
            })
        };

        vm.deselect = function () {
            vm.contact = "";
        };
    }]);