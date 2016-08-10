provide('recipe.Ingredient');

recipe.Ingredient = function(quantity, unit) {
	this.quantity = quantity;
	this.unit = unit;
};

recipe.Ingredient.prototype.isSingular = function() {
	return this.quantity > 0 && this.quantity <= 1;
};

recipe.Ingredient.prototype.pluralize = function() {
	if (this.isSingular()) {
		return this.unit;
	}
	else {
		return this.unit + 's';
	}
};

recipe.Ingredient.prototype.getSingularUnit = function() {
	if (this.isSingular()) {
		return this.unit;
	}
	else {
		return this.unit.replace(/s$/, '');
	}
};

recipe.Ingredient.prototype.toString = function() {
	return this.quantity.toString() + ' ' + this.pluralize();
};

recipe.Ingredient.prototype.convertUnits = function() {
	var conversion = recipe.Ingredient.CONVERSIONS[this.unit] || {};
	if (conversion.min && this.quantity < conversion.min.value) {
		this.unit = conversion.min.next;
		this.quantity.multiply(conversion.to[this.unit]);
	}
	else if (conversion.max && this.quantity >= conversion.max.value) {
		this.unit = conversion.max.next;
		this.quantity.multiply(conversion.to[this.unit]);
	}
	return this;
};

recipe.Ingredient.CONVERSIONS = {
	cup: {
		to: {
			tablespoon: 16
		},
		min: {
			value: 1/4,
			next: 'tablespoon'
		}
	},
	tablespoon: {
		to: {
			teaspoon: 3,
			cup: 1/16
		},
		min: {
			value: 1,
			next: 'teaspoon'
		},
		max: {
			value: 4,
			next: 'cup'
		}
	},
	teaspoon: {
		to: {
			tablespoon: 1/3
		},
		max: {
			value: 3,
			next: 'tablespoon'
		}
	}
};
