(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		var buy = this;

		buy.items = ShoppingListCheckOffService.getToBuyItems();
		buy.buyItem = function(itemIndex) {
			ShoppingListCheckOffService.buyItem(itemIndex);
		}
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var bought = this;

		bought.items = ShoppingListCheckOffService.getBoughtItems();
	}

	function ShoppingListCheckOffService() {
		var service = this;

		var toBuyItems = [
			{
				name: "cookies",
				quantity: 25
			},
			{
				name: "bread",
				quantity: 3
			},
			{
				name: "beef",
				quantity: 5
			},
			{
				name: "water",
				quantity: 4
			},
			{
				name: "gum",
				quantity: 10
			}
		];

		var boughtItems = [];

		service.buyItem = function(itemIndex) {
			boughtItems.push(toBuyItems.splice(itemIndex, 1)[0]);
			
		};

		service.getToBuyItems = function() {
			return toBuyItems;
		}

		service.getBoughtItems = function() {
			return boughtItems;
		}
	}

})();