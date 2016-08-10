describe('recipe.markIngredient', function() {
	function getElement(ingredient) {
		var container = document.createElement('div');
		container.innerHTML = ingredient.innerHTML;
		return container.children[0];
	}

	it('marks quantity and singular unit data attributes', function() {
		var ingredient = {
			textContent: '1 cup milk'
		};
		recipe.markIngredient(ingredient);
		expect(getElement(ingredient).dataset.quantity).toEqual('1');
		expect(getElement(ingredient).dataset.unit).toEqual('cup');
		var ingredient = {
			textContent: '2 cups milk'
		};
		recipe.markIngredient(ingredient);
		expect(getElement(ingredient).dataset.quantity).toEqual('2');
		expect(getElement(ingredient).dataset.unit).toEqual('cup');
	});
	it('handles fractions', function() {
		var ingredient = {
			textContent: '1/2 cup milk'
		};
		recipe.markIngredient(ingredient);
		expect(getElement(ingredient).dataset.quantity).toEqual('1/2');
		expect(getElement(ingredient).dataset.unit).toEqual('cup');
		var ingredient = {
			textContent: '1 1/2 cup milk'
		};
		recipe.markIngredient(ingredient);
		expect(getElement(ingredient).dataset.quantity).toEqual('3/2');
		expect(getElement(ingredient).dataset.unit).toEqual('cup');
	});
	it('assigns the ingredient class name', function() {
		var ingredient = {
			textContent: '1 cup milk'
		};
		recipe.markIngredient(ingredient);
		expect(getElement(ingredient).classList.contains('ingredient')).toEqual(true);
	});
	it('retains the full ingredient text', function() {
		var ingredient = {
			textContent: '2 cups milk'
		};
		recipe.markIngredient(ingredient);
		expect(getElement(ingredient).parentNode.textContent).toEqual('2 cups milk');
	});
});

describe('recipe.adjustIngredient', function() {
	it('handles singular', function() {
		var ingredient = {
			dataset: {
				quantity: '1',
				unit: 'cup'
			}
		};
		recipe.adjustIngredient(ingredient, 1);
		expect(ingredient.textContent).toEqual('1 cup');
	});
	it('handles plural', function() {
		var ingredient = {
			dataset: {
				quantity: '1',
				unit: 'cup'
			}
		};
		recipe.adjustIngredient(ingredient, 2);
		expect(ingredient.textContent).toEqual('2 cups');
	});
	it('handles fractions', function() {
		var ingredient = {
			dataset: {
				quantity: '1/2',
				unit: 'cup'
			}
		};
		recipe.adjustIngredient(ingredient, 2);
		expect(ingredient.textContent).toEqual('1 cup');
		var ingredient = {
			dataset: {
				quantity: '1/4',
				unit: 'cup'
			}
		};
		recipe.adjustIngredient(ingredient, 2);
		expect(ingredient.textContent).toEqual('1/2 cup');
		var ingredient = {
			dataset: {
				quantity: '3/2',
				unit: 'cup'
			}
		};
		recipe.adjustIngredient(ingredient, 2);
		expect(ingredient.textContent).toEqual('3 cups');
	});
});
