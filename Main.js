

var app = angular.module("myApp",["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/login",{
            templateUrl: "login.html",
            controller : "ctrl1"
        })
        .when("/emp", {
            templateUrl: "list.html",
            controller : "listctrl"
        })

});
app.controller("listctrl",function ($scope,myService) {
    myService.getdata().then(function (value) {
        $scope.lists = value.data;
    })
    $scope.view = function (a) {
        $scope.fName = $scope.lists[a-1].firstname;
        $scope.lName = $scope.lists[a-1].lastname;
        $scope.Email = $scope.lists[a-1].email;
        $scope.Age = $scope.lists[a-1].age;
        $scope.City = $scope.lists[a-1].city;
    }

    $scope.edit = function (e) {
        $scope.fname = $scope.lists[e - 1].firstname;
        $scope.lname = $scope.lists[e - 1].lastname;
        $scope.email = $scope.lists[e - 1].email;
        $scope.city = $scope.lists[e - 1].city;
        $scope.age = $scope.lists[e - 1].age;

        $scope.change = function () {
            console.log($scope.fname);
            $scope.lists[e - 1].firstname = $scope.fname;
            $scope.lists[e - 1].age = $scope.age;
            console.log($scope.lists[e - 1].firstname);
        }
    }
    $scope.delete = function (d) {

        for(var i = 0; i< $scope.lists.length; i++)
        {
            if($scope.lists[i].id == d)
            {
                break;
            }
        }
        $scope.lists.splice(i, 1)
    }

    $scope.addEmp = function () {
        var users  = {
            id: $scope.lists.length + 1,
            firstname: $scope.fname,
            lastname: $scope.lname,
            email: $scope.email,
            gender: $scope.gender,
            age:$scope.age

        }
        $scope.lists.push(users);
    }

    $scope.orderByMe = function (x) {
        $scope.myorder = x
        console.log($scope.myorder)
    }
});

app.controller("ctrl1", function ($scope) {

});

app.service("myService", function ($http) {

         this.getdata = function () {
             return $http.get("Employee_Data.JSON")
         }

});



