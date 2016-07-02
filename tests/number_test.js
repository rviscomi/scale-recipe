describe('recipe.Number', function() {
	function N(n) {
		return new recipe.Number(n);
	}
	it('throws an exception on invalid numbers', function() {
		expect(N).toThrow();
		expect(N.bind(null, '')).toThrow();
		expect(N.bind(null, 'foo')).toThrow();
		expect(N.bind(null, '1.0')).toThrow();
		expect(N.bind(null, '1,000')).toThrow();
		expect(N.bind(null, '1/0')).toThrow();
	})
	it('handles whole numbers', function() {
		var n = N('0');
		expect(n.wholeNumber).toBe(0);
		expect(n.numerator).toBeNaN();
		expect(n.denominator).toBeNaN();
		expect(N('1').wholeNumber).toBe(1);
	});
	it('handles fractions', function() {
		var n = N('1/2');
		expect(n.wholeNumber).toBeNaN();
		expect(n.numerator).toBe(1);
		expect(n.denominator).toBe(2);
	});
	it('does not simplify fractions', function() {
		var n = N('2/4');
		expect(n.wholeNumber).toBeNaN();
		expect(n.numerator).toBe(2);
		expect(n.denominator).toBe(4);
		n = N('0/1');
		expect(n.wholeNumber).toBeNaN();
		expect(n.numerator).toBe(0);
		expect(n.denominator).toBe(1);
	});
	it('handles mixed fractions', function() {
		var n = N('1 2/3');
		expect(n.wholeNumber).toBe(1);
		expect(n.numerator).toBe(2);
		expect(n.denominator).toBe(3);
	});
	it('handles mixed fractions delimeted by &nbsp;', function() {
		var n = N('1&nbsp;2/3');
		expect(n.wholeNumber).toBe(1);
		expect(n.numerator).toBe(2);
		expect(n.denominator).toBe(3);
	});

	describe('isFraction', function() {
		it('handles fractions', function() {
			expect(N('1/2').isFraction()).toBe(true);
			expect(N('1 1/2').isFraction()).toBe(true);
		});
		it('handles whole numbers', function() {
			expect(N('1').isFraction()).toBe(false);
			expect(N('10').isFraction()).toBe(false);
		});
	});

	describe('isProperFraction', function() {
		it('handles proper fractions', function() {
			expect(N('1/2').isProperFraction()).toBe(true);
		});
		it('handles improper fractions', function() {
			expect(N('2/2').isProperFraction()).toBe(false);
			expect(N('3/2').isProperFraction()).toBe(false);
		});
		it('handles mixed fractions', function() {
			expect(N('1 1/2').isProperFraction()).toBe(true);
		});
		it('handles whole numbers', function() {
			expect(N('1').isProperFraction()).toBe(false);
		});
	});

	describe('isImproperFraction', function() {
		it('handles proper fractions', function() {
			expect(N('1/2').isImproperFraction()).toBe(false);
		});
		it('handles improper fractions', function() {
			expect(N('2/2').isImproperFraction()).toBe(true);
			expect(N('3/2').isImproperFraction()).toBe(true);
		});
		it('handles mixed fractions', function() {
			expect(N('1 1/2').isImproperFraction()).toBe(false);
		});
		it('handles whole numbers', function() {
			expect(N('1').isProperFraction()).toBe(false);
		});
	});

	describe('isMixedFraction', function() {
		it('handles proper fractions', function() {
			expect(N('1/2').isMixedFraction()).toBe(false);
		});
		it('handles improper fractions', function() {
			expect(N('2/2').isMixedFraction()).toBe(false);
			expect(N('3/2').isMixedFraction()).toBe(false);
		});
		it('handles mixed fractions', function() {
			expect(N('1 1/2').isMixedFraction()).toBe(true);
			expect(N('0 1/2').isMixedFraction()).toBe(true);
		});
		it('handles whole numbers', function() {
			expect(N('1').isMixedFraction()).toBe(false);
		});
	});
	
	describe('simplifyFraction', function() {
		var Ns = function(number) {
			return new N(number).simplifyFraction();
		};
		it('supports method chaining', function() {
			expect(Ns('1') instanceof recipe.Number).toBe(true);
		});
		it('handles whole numbers', function() {
			var s = Ns('0');
			expect(s.wholeNumber).toBe(0);
			expect(s.isFraction()).toBe(false);
			s = Ns('1');
			expect(s.wholeNumber).toBe(1);
			expect(s.isFraction()).toBe(false);
		});
		it('handles proper fractions', function() {
			var s = Ns('1/2');
			expect(s.wholeNumber).toBeNaN();
			expect(s.numerator).toBe(1);
			expect(s.denominator).toBe(2);
			s = Ns('0/1');
			expect(s.wholeNumber).toBe(0);
			expect(s.isFraction()).toBe(false);
		});
		it('handles improper fractions', function() {
			var s = Ns('3/2');
			expect(s.wholeNumber).toBe(1);
			expect(s.numerator).toBe(1);
			expect(s.denominator).toBe(2);
			s = Ns('4/2');
			expect(s.wholeNumber).toBe(2);
			expect(s.isFraction()).toBe(false);
			s = Ns('1 4/2');
			expect(s.wholeNumber).toBe(3);
			expect(s.isFraction()).toBe(false);
			s = Ns('1 3/2');
			expect(s.wholeNumber).toBe(2);
			expect(s.numerator).toBe(1);
			expect(s.denominator).toBe(2);
		});
		it('handles mixed fractions', function() {
			var s = Ns('1 1/2');
			expect(s.wholeNumber).toBe(1);
			expect(s.numerator).toBe(1);
			expect(s.denominator).toBe(2);
			s = Ns('1 0/1');
			expect(s.wholeNumber).toBe(1);
			expect(s.isFraction()).toBe(false);
		});
	});
	
	describe('reduceFraction', function() {
		var Nr = function(number) {
			return new N(number).reduceFraction();
		};
		it('supports method chaining', function() {
			expect(Nr('1') instanceof recipe.Number).toBe(true);
		});
		it('handles whole numbers', function() {
			var r = Nr('0');
			expect(r.wholeNumber).toBe(0);
			expect(r.isFraction()).toBe(false);
			r = Nr('1');
			expect(r.wholeNumber).toBe(1);
			expect(r.isFraction()).toBe(false);
		});
		it('handles proper fractions', function() {
			var r = Nr('1/2');
			expect(r.wholeNumber).toBeNaN();
			expect(r.numerator).toBe(1);
			expect(r.denominator).toBe(2);
			r = Nr('0/1');
			expect(r.wholeNumber).toBeNaN();
			expect(r.numerator).toBe(0);
			expect(r.denominator).toBe(1);
			r = Nr('2/4');
			expect(r.wholeNumber).toBeNaN();
			expect(r.numerator).toBe(1);
			expect(r.denominator).toBe(2);
		});
		it('handles improper fractions', function() {
			var r = Nr('3/2');
			expect(r.wholeNumber).toBeNaN();
			expect(r.numerator).toBe(3);
			expect(r.denominator).toBe(2);
			r = Nr('2/4');
			expect(r.wholeNumber).toBeNaN();
			expect(r.numerator).toBe(1);
			expect(r.denominator).toBe(2);
			r = Nr('4/2');
			expect(r.wholeNumber).toBeNaN();
			expect(r.numerator).toBe(2);
			expect(r.denominator).toBe(1);
			r = Nr('1 4/2');
			expect(r.wholeNumber).toBe(1);
			expect(r.numerator).toBe(2);
			expect(r.denominator).toBe(1);
		});
		it('handles mixed fractions', function() {
			var r = Nr('1 2/4');
			expect(r.wholeNumber).toBe(1);
			expect(r.numerator).toBe(1);
			expect(r.denominator).toBe(2);
		});
	});
	
	describe('toImproperFraction', function() {
		var Ni = function(number) {
			return new N(number).toImproperFraction();
		};
		it('supports method chaining', function() {
			expect(Ni('1') instanceof recipe.Number).toBe(true);
		});
		it('handles whole numbers', function() {
			var i = Ni('0');
			expect(i.wholeNumber).toBeNaN();
			expect(i.numerator).toBe(0);
			expect(i.denominator).toBe(1);
			i = Ni('1');
			expect(i.wholeNumber).toBeNaN();
			expect(i.numerator).toBe(1);
			expect(i.denominator).toBe(1);
		});
		it('handles proper fractions', function() {
			var i = Ni('1/2');
			expect(i.wholeNumber).toBeNaN();
			expect(i.numerator).toBe(1);
			expect(i.denominator).toBe(2);
			i = Ni('0/1');
			expect(i.wholeNumber).toBeNaN();
			expect(i.numerator).toBe(0);
			expect(i.denominator).toBe(1);
		});
		it('handles improper fractions', function() {
			var i = Ni('4/2');
			expect(i.wholeNumber).toBeNaN();
			expect(i.numerator).toBe(4);
			expect(i.denominator).toBe(2);
			i = Ni('1 4/2');
			expect(i.wholeNumber).toBeNaN();
			expect(i.numerator).toBe(6);
			expect(i.denominator).toBe(2);
			i = Ni('1 0/2');
			expect(i.wholeNumber).toBeNaN();
			expect(i.numerator).toBe(2);
			expect(i.denominator).toBe(2);
		});
		it('handles mixed fractions', function() {
			var i = Ni('1 2/4');
			expect(i.wholeNumber).toBeNaN();
			expect(i.numerator).toBe(6);
			expect(i.denominator).toBe(4);
		});
	});
	
	describe('multiply', function() {
		var Nx = function(number, multiplier) {
			return new N(number).multiply(multiplier);
		};
		it('handles whole numbers', function() {
			var x = Nx('2', 3);
			expect(x.wholeNumber).toBe(6);
			expect(x.isFraction()).toBe(false);
		});
		it('handles proper fractions', function() {
			var x = Nx('1/2', 2);
			expect(x.wholeNumber).toBe(1);
			expect(x.isFraction()).toBe(false);
			x = Nx('1/2', 3);
			expect(x.wholeNumber).toBe(1);
			expect(x.numerator).toBe(1);
			expect(x.denominator).toBe(2);
			x = Nx('1/2', 0.5);
			expect(x.wholeNumber).toBeNaN();
			expect(x.numerator).toBe(1);
			expect(x.denominator).toBe(4);
		});
		it('handles improper fractions', function() {
			var x = Nx('3/2', 1);
			expect(x.wholeNumber).toBe(1);
			expect(x.numerator).toBe(1);
			expect(x.denominator).toBe(2);
			x = Nx('3/2', 0.5);
			expect(x.wholeNumber).toBeNaN();
			expect(x.numerator).toBe(3);
			expect(x.denominator).toBe(4);
			x = Nx('3/2', 2);
			expect(x.wholeNumber).toBe(3);
			expect(x.isFraction()).toBe(false);
			x = Nx('2/2', 2);
			expect(x.wholeNumber).toBe(2);
			expect(x.isFraction()).toBe(false);
		});
		it('handles mixed fractions', function() {
			var x = Nx('1 1/2', 2);
			expect(x.wholeNumber).toBe(3);
			expect(x.isFraction()).toBe(false);
			x = Nx('1 1/2', 0.5);
			expect(x.wholeNumber).toBeNaN();
			expect(x.numerator).toBe(3);
			expect(x.denominator).toBe(4);
		});
	});
	
	describe('toString', function() {
		var Nt = function(number) {
			return new N(number).toString();
		};
		it('handles whole numbers', function() {
			expect(Nt('0')).toBe('0');
			expect(Nt('2')).toBe('2');
		});
		it('handles proper fractions', function() {
			expect(Nt('1/2')).toBe('1/2');
			expect(Nt('2/4')).toBe('2/4');
		});
		it('handles improper fractions', function() {
			expect(Nt('3/2')).toBe('3/2');
			expect(Nt('2/2')).toBe('2/2');
		});
		it('handles mixed fractions', function() {
			expect(Nt('1 1/2')).toBe('1 1/2');
			expect(Nt('1&nbsp;1/2')).toBe('1 1/2');
		});
	});
	
	describe('valueOf', function() {
		var Nv = function(number) {
			return new N(number).valueOf();
		};
		it('enables comparison with other instances', function() {
			expect(N('1') + N('1')).toBe(2);
			expect(+N('0') < +N('2')).toBe(true);
			expect(+N('2') === +N('4/2')).toBe(true);
		});
		it('handles whole numbers', function() {
			expect(Nv('0')).toBe(0);
			expect(Nv('2')).toBe(2);
		});
		it('handles proper fractions', function() {
			expect(Nv('1/2')).toBe(0.5);
			expect(Nv('2/4')).toBe(0.5);
		});
		it('handles improper fractions', function() {
			expect(Nv('3/2')).toBe(1.5);
			expect(Nv('2/2')).toBe(1);
		});
		it('handles mixed fractions', function() {
			expect(Nv('1 1/2')).toBe(1.5);
			expect(Nv('1&nbsp;1/2')).toBe(1.5);
		});
	});
});
