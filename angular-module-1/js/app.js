(function () {
	'use strict';
	
	angular.module('LunchChecker', [])
	.controller('LunchCheckerController', LunchCheckerController);

	LunchCheckerController.$inject = ['$scope'];
	function LunchCheckerController($scope) {
		$scope.lunch = "";
		$scope.message = "";
		$scope.state = "";

		$scope.showMessage = function() {
			var lunchArr = $scope.lunch.split(/\s*,\s*/);

			removeEmptyItems(lunchArr);

			if(lunchArr.length === 0) {
				$scope.message = "Please enter data first";
				$scope.state = "error";
			} else if(lunchArr.length <= 3) {
				$scope.message = "Enjoy!";
				$scope.state = "success";
			} else {
				$scope.message = "Too much!";
				$scope.state = "success";
			}
		};
	}

	function removeEmptyItems(arr) {
		for (var i = 0; i < arr.length; i++) {

			if(arr[i] === "") {
				arr.splice(i, 1);
				i--;
			}
		};
	}

})();