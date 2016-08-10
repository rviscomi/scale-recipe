describe('recipe.Ingredient', function() {
	var C = 'cup';
	var Ts = 'tablespoon';
	var ts = 'teaspoon'
	var Number = function(number) {
		return new recipe.Number(number);
	};
	var Ingredient = function(quantity, unit) {
		return new recipe.Ingredient(quantity, unit);
	};
	describe('toString', function() {
		var toString = function(quantity, unit) {
			return Ingredient(quantity, unit).toString();
		};
		it('handles singular', function() {
			expect(toString(Number('1/2'), C)).toBe('1/2 ' + C);
			expect(toString(Number('1'), ts)).toBe('1 ' + ts);
		});
		it('handles plural', function() {
			expect(toString(Number('0'), C)).toBe('0 ' + C + 's');
			expect(toString(Number('1 1/2'), ts)).toBe('1 1/2 ' + ts + 's');
		});
	});
	describe('convertUnits', function() {
		var convert = function(quantity, unit) {
			return Ingredient(quantity, unit).convertUnits();
		};
		it('does nothing when within the bounds', function() {
			var c = convert(Number('1'), C);
			expect(c.quantity.valueOf()).toBe(1);
			expect(c.unit).toBe(C);
			c = convert(Number('2'), Ts);
			expect(c.quantity.valueOf()).toBe(2);
			expect(c.unit).toBe(Ts);
		});
		it('converts down from cups to tablespoons', function() {
			var c = convert(Number('1/8'), C);
			expect(c.quantity.valueOf()).toBe(2)
			expect(c.unit).toBe(Ts);
		});
		it('converts up from tablespoons to cups', function() {
			var c = convert(Number('4'), Ts);
			expect(c.quantity.valueOf()).toBe(1/4)
			expect(c.unit).toBe(C);
			c = convert(Number('16'), Ts);
			expect(c.quantity.valueOf()).toBe(1)
			expect(c.unit).toBe(C);
		});
	});
});
