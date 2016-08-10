provide('recipe.Number');

/**
 * Creates a Number object from a string of any of forms:
 *   * W
 *   * N/D
 *   * W N/D
 *   * W&nbsp;N/D
 * where W, N, and D are non-negative integers.
 *
 * @constructor
 * @param {string} number The string representation of the number.
 */
recipe.Number = function(number) {
	var match = number.match(/^(?:(\d+)|(?:(\d+)(?: |&nbsp;))?(?:(\d+)\/(\d+))?)$/);
	if (!match || !match[0] || match[4] == '0') {
		throw 'Invalid number: "' + number + '".';
	}
	this.wholeNumber = +(match[1] || match[2]);
	this.numerator = +match[3];
	this.denominator = +match[4];
};

/**
 * Determines if the number is a fraction.
 * @this {recipe.Number}
 * @return {boolean} If the number is a fraction.
 */
recipe.Number.prototype.isFraction = function() {
	return !!(this.numerator && this.denominator);
};

/**
 * Determines if the fraction is proper, which is defined as
 * the numerator being strictly less than the denominator.
 * @this {recipe.Number}
 * @return {boolean} If the fraction is proper.
 */
recipe.Number.prototype.isProperFraction = function() {
	return this.numerator < this.denominator;
};

/**
 * Determines if the fraction is improper, which is defined as
 * the numerator being greater than or equal to the denominator.
 * @this {recipe.Number}
 * @return {boolean} If the fraction is improper.
 */
recipe.Number.prototype.isImproperFraction = function() {
	return this.numerator >= this.denominator;
};

/**
 * Determines if the fraction is mixed, which is defined as
 * a whole number with a proper fraction.
 * @this {recipe.Number}
 * @return {boolean} If the fraction is mixed.
 */
recipe.Number.prototype.isMixedFraction = function() {
	return this.isProperFraction() && !isNaN(this.wholeNumber);
};

/**
 * Simplifies fractions. Examples:
 *   3/2 = 1 1/2
 *   4/2 = 2
 *   1 3/2 = 2 1/2
 *   0/1 = 0
 *   1 0/1 = 1
 * @this {recipe.Number}
 * @return {recipe.Number} The instance.
 */
recipe.Number.prototype.simplifyFraction = function() {
	if (this.isImproperFraction()) {
		this.wholeNumber |= 0;
		this.wholeNumber += Math.floor(this.numerator / this.denominator);
		var modulus = this.numerator % this.denominator;
		if (modulus) {
			this.numerator = modulus;
		}
		else {
			this.numerator = this.denominator = NaN;
		}
	}
	else if (this.numerator == 0) {
		this.wholeNumber |= 0;
		this.numerator = this.denominator = NaN;
	}
	return this;
};

/**
 * Reduces a fraction. Examples:
 *   2/6 = 1/3
 *   6/2 = 3/1
 * @this {recipe.Number}
 * @return {recipe.Number} The instance.
 */
recipe.Number.prototype.reduceFraction = function() {
	if (this.isFraction()) {
		var gcd = recipe.Number.gcd(this.numerator, this.denominator);
		this.numerator /= gcd;
		this.denominator /= gcd;
	}
	return this;
};

/**
 * Converts proper fractions to improper fractions. Examples:
 *   1 1/2 = 3/2
 *   3/2 = 3/2
 *   1/2 = 1/2
 *   2 = 2
 *
 * @this {recipe.Number}
 * @return {recipe.Number} The instance.
 */
recipe.Number.prototype.toImproperFraction = function() {
	if (!isNaN(this.wholeNumber)) {
		this.numerator |= 0;
		this.denominator = this.denominator || 1;
		this.numerator += this.wholeNumber * this.denominator;
		this.wholeNumber = NaN;
	}
	return this;
};

/**
 * Multiplies the number by some decimal value.
 * @param {number} multiplier The multiplier.
 * @this {recipe.Number}
 * @return {recipe.Number} The instance.
 */
recipe.Number.prototype.multiply = function(multiplier) {
	this.toImproperFraction();
	this.numerator *= multiplier;
	return this.reduceFraction().simplifyFraction();
};

/**
 * Gets a string representation of the number.
 * @this {recipe.Number}
 * @return {string} The string representation of the number.
 */
recipe.Number.prototype.toString = function() {
	var number = '';
	var fraction = '';
	if (!isNaN(this.wholeNumber)) {
		number += this.wholeNumber;
	}
	if (this.isFraction()) {
		fraction = this.numerator + '/' + this.denominator;
	}
	if (number && fraction) {
		number += ' ' + fraction;
	}
	return number || fraction;
};

/**
 * Gets a numeric representation of the number.
 * @this {recipe.Number}
 * @return {number} The numeric representation of the number.
 */
recipe.Number.prototype.valueOf = function() {
	var value = this.wholeNumber || 0;
	value += (this.numerator / this.denominator) || 0;
	return value;
};

/**
 * Euclid's algorithm to find the greatest common divisor of two numbers.
 * @param {number} a One number.
 * @param {number} b Another number.
 * @return {number} The GCD of the numbers.
 */
recipe.Number.gcd = function gcd(a, b){
	return b ? recipe.Number.gcd(b, a % b) : a;
};
