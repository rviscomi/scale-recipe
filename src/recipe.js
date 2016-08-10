provide('recipe');

recipe.INGREDIENT_SELECTOR = 'li';

recipe.init = function(rootNode) {
	recipe.rootNode = rootNode;
	recipe.bindAdjuster();
	recipe.markIngredients();
};

/**
 * Replace the static text indicating how much the recipe produces
 * with a dynamic number stepper that changes the ingredient proportions.
 */
recipe.bindAdjuster = function() {
	recipe.rootNode.innerHTML = recipe.rootNode.innerHTML.replace(/(serves )(\d+)/i,
			function(unused_match, serves, quantity) {
		return serves + '<input type="number" min="0" value="' + quantity + '" step="' + quantity/4 + '" onchange="recipe.adjustIngredients(this.value/' + quantity + ')"/>'
	});
};

/**
 * Parses ingredient quantity and unit information.
 */
recipe.markIngredients = function() {
	var ingredients = recipe.rootNode.querySelectorAll(recipe.INGREDIENT_SELECTOR);
	Array.prototype.forEach.call(ingredients, function(ingredient) {
		recipe.markIngredient(ingredient);
	});
};

recipe.markIngredient = function(ingredient) {
	ingredient.innerHTML = ingredient.textContent.replace(
			/^([\d\/?[^\s&]*)(?:&nbsp;|\s)(\w*)/g,
			function(match, quantity, unit) {
	  var n = new recipe.Number(quantity);
		var i = new recipe.Ingredient(n, unit);
		var serializedQuantity = n.isFraction() ? n.toImproperFraction() : n;
		return '<span class="ingredient" data-quantity="' +
				serializedQuantity.toString() +
				'" data-unit="' + i.getSingularUnit() + '">' + match + '</span>';
	});
};

/**
 * Change the proportion of the ingredient.
 */
recipe.adjustIngredients = function(scale) {
	var ingredients = document.getElementsByClassName('ingredient');
	Array.prototype.forEach.call(ingredients, function(ingredient) {
  	recipe.adjustIngredient(ingredient, scale);
  });
};

recipe.adjustIngredient = function(ingredient, scale) {
	var quantity = ingredient.dataset['quantity'];
	var unit = ingredient.dataset['unit'];
	var scaledQuantity = new recipe.Number(quantity).multiply(scale);
	ingredient.textContent = new recipe.Ingredient(scaledQuantity, unit).convertUnits().toString();
};
