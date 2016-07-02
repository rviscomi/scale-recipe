describe("recipes.math.reduce", function() {
	it("reduces fractions", function() {
		expect(recipes.math.reduce(2, 6)).toEqual([1, 3]);
		expect(recipes.math.reduce(6, 2)).toEqual([3, 1]);
	});
	it("handles strings", function() {
		expect(recipes.math.reduce("2", "6")).toEqual([1, 3]);
		expect(recipes.math.reduce(6, "2")).toEqual([3, 1]);
	});
});

describe("recipes.math.simplify", function() {
	it("simplifies fractions", function() {
		expect(recipes.math.simplify([1, 2])).toBe("1/2");
		expect(recipes.math.simplify([3, 2])).toBe("1 1/2");
		expect(recipes.math.simplify([4, 2])).toEqual(2);
	});
});

describe("recipes.math.toImproperFraction", function() {
	it("handles proper fractions", function() {
		expect(recipes.math.toImproperFraction('1 1/2')).toBe('3/2');
	});
	it("handles improper fractions", function() {
		expect(recipes.math.toImproperFraction('3/2')).toBe('3/2');
	});
});

describe("recipes.math.scale", function() {
	it("handles whole numbers", function() {
		expect(recipes.math.scale(1, "1")).toBe(1);
		expect(recipes.math.scale(2, "1")).toBe(2);
		expect(recipes.math.scale(1, "2")).toBe(2);
		expect(recipes.math.scale(0.5, "2")).toBe(1);
	});
	it("handles fractions", function() {
		expect(recipes.math.scale(1, "1/3")).toBe("1/3");
		expect(recipes.math.scale(2, "1/3")).toBe("2/3");
	});
	it("reduces fractions", function() {
		expect(recipes.math.scale(3, "1/3")).toBe(1);
		expect(recipes.math.scale(0.5, "1/2")).toBe("1/4");
	});
	it("simplifies fractions", function() {
		expect(recipes.math.scale(3, "1/2")).toBe("1 1/2");
		expect(recipes.math.scale(4, "1/2")).toBe(2);
	});
});

describe('recipes.math.isFraction', function() {
	it('handles numbers', function() {
		expect(recipes.math.isFraction(1)).toBe(false);
		expect(recipes.math.isFraction('1')).toBe(false);
	});
	it('handles fractions', function() {
		expect(recipes.math.isFraction('1/2')).toBe(true);
		expect(recipes.math.isFraction('3/2')).toBe(true);
		expect(recipes.math.isFraction('1 1/2')).toBe(true);
	});
});

describe('recipes.math.isProperFraction', function() {
	it('handles numbers', function() {
		expect(recipes.math.isProperFraction(1)).toBe(false);
		expect(recipes.math.isProperFraction('1')).toBe(false);
	});
	it('handles fractions', function() {
		expect(recipes.math.isProperFraction('1/2')).toBe(true);
		expect(recipes.math.isProperFraction('3/2')).toBe(false);
		expect(recipes.math.isProperFraction('1 1/2')).toBe(false);
	});
});

describe('recipes.math.isImproperFraction', function() {
	it('handles numbers', function() {
		expect(recipes.math.isImproperFraction(1)).toBe(false);
		expect(recipes.math.isImproperFraction('1')).toBe(false);
	});
	it('handles fractions', function() {
		expect(recipes.math.isImproperFraction('1/2')).toBe(false);
		expect(recipes.math.isImproperFraction('3/2')).toBe(true);
		expect(recipes.math.isImproperFraction('1 1/2')).toBe(false);
	});
});

describe('recipes.math.isMixedFraction', function() {
	it('handles numbers', function() {
		expect(recipes.math.isMixedFraction(1)).toBe(false);
		expect(recipes.math.isMixedFraction('1')).toBe(false);
	});
	it('handles fractions', function() {
		expect(recipes.math.isMixedFraction('1/2')).toBe(false);
		expect(recipes.math.isMixedFraction('3/2')).toBe(false);
		expect(recipes.math.isMixedFraction('1 1/2')).toBe(true);
		expect(recipes.math.isMixedFraction('10 1/2')).toBe(true);
	});
	it('handles &nbsp;', function() {
		expect(recipes.math.isMixedFraction('1&nbsp;1/2')).toBe(true);
		expect(recipes.math.isMixedFraction('10&nbsp;1/2')).toBe(true);
	});
});