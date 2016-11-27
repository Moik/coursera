(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'result.html',
			scope: {
				items: '<',
				onRemove: '&',
				isSearched: '<'
			},
			controller: NarrowItDownController,
			controllerAs: 'list',
			bindToController: true
		};

		return ddo;
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var list = this;
		list.found = [];
		list.searchTerm = "";
		list.searchItems = function() {
			var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

			promise.then(function (response) {
				list.found = response;
				list.isSearched = true;
			})
			.catch(function (error) {
				console.log(error);
			});
		};
		list.removeItem = function(index) {
			list.found.splice(index, 1);
		}


	}


	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {
		var service = this;

		service.getMatchedMenuItems = function(searchTerm) {
			return $http({
				method: "GET",
				url: ApiBasePath
			}).then(function (result) {
					// process result and only keep items that match
					var foundItems = [];
					if(searchTerm) {
						foundItems = result.data.menu_items;

						for (var i = 0; i < foundItems.length; i++) {
							if(foundItems[i].description.indexOf(searchTerm.toLowerCase().trim()) === -1) {
								foundItems.splice(i, 1);
								i--;
							}
						}

					}
					// return processed items
					return foundItems;
				});
		};

		service.buyItem = function(itemIndex) {
			boughtItems.push(toBuyItems.splice(itemIndex, 1)[0]);
			
		};

	}

})();