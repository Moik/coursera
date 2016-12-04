(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemController', ItemController);

ItemController.$inject = ['items'];
function ItemController(items) {
  var itemsList = this;
  itemsList.items = items.menu_items;
  itemsList.categoryName = items.category.name;
}

})();