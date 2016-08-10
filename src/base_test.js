beforeEach(function() {
	delete window['foo'];
});
	
describe('provide', function() {
	it('creates new objects', function() {
		expect(window['foo']).toBe(undefined);
		provide('foo');
		expect(window['foo']).toEqual({});
	});
	it('preserves existing objects', function() {
		window['foo'] = {'bar': {}};
		expect(window['foo'].bar).toEqual({});
		provide('foo');
		expect(window['foo'].bar).toEqual({});
	});
	it('creates nested objects', function() {
		expect(window['foo']).toBe(undefined);
		provide('foo.bar')
		expect(window['foo'].bar).toEqual({});
		
	});
});

describe('require', function() {
	it('does nothing when the namespace exists', function() {
		provide('foo');
		expect(require.bind(null, 'foo')).not.toThrow();
		provide('foo.bar');
		expect(require.bind(null, 'foo.bar')).not.toThrow();
	});
	it('throws an exception when the namespace doesn\'t exist', function() {
		expect(require.bind(null, 'foo')).toThrow();
		provide('foo');
		expect(require.bind(null, 'foo.bar')).toThrow();
	});
});
