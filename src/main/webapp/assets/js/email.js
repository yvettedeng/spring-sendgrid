angular.module('email', ['ngResource']).
    factory('Email', function ($resource) {
        return $resource('email', {},
            { send: { method: "POST" } }
        );
    });

function EmailController($scope, Email) {

    $scope.send = function (message) {
        Email.send({}, message,
            function (data) {
                $scope.status = data;
                if (!$scope.status.error && $scope.status.message == "") {
                    $scope.status.message = "E-mail sent successfully";
                }
            },
            function (result) {
                $scope.status = { error: true, message: "Error calling app controller: " + result.status };
            }
        );
    };

    $scope.reset = function () {
        $scope.status = null;
        $scope.message = {
            toAddresses: [ "" ],
            ccAddresses: [ "" ],
            bccAddresses: [ "" ],
            fromAddress: "",
            subject: "",
            body: ""
        };
    }

    $scope.addToAddress = function() {
        this.message.toAddresses.push("");
    }

    $scope.addCcAddress = function() {
        this.message.ccAddresses.push("");
    }

    $scope.addBccAddress = function() {
        this.message.bccAddresses.push("");
    }

    $scope.reset();
}
