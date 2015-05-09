var MockMethod = require('./../src/mock-method'),
	assert = require('assert');

describe('MockMethods', function(){
	it('should create simple mock method', function(){
		var oMockMethod = new MockMethod('test');
		assert.ok(oMockMethod);
		assert.equal('test', oMockMethod.name);
	});
	it('should throw an error if nothing to return', function(){
		var oMockMethod = new MockMethod('test');
		assert.throws(function(){
			oMockMethod.invoke();
		});
	});
	it('should return required value', function(){
		var oMockMethod = new MockMethod('test');
		oMockMethod.returns(42);
		assert.equal(42, oMockMethod.invoke());
	});
	it('should return required values in the same order', function(){
		var oMockMethod = new MockMethod('test');
		oMockMethod.returns(42).returns(10).returns(13);
		assert.equal(42, oMockMethod.invoke());
		assert.equal(10, oMockMethod.invoke());
		assert.equal(13, oMockMethod.invoke());
	});
	it('should throws error if nothing to return again', function(){
		var oMockMethod = new MockMethod('test');
		oMockMethod.returns(42).returns(10).returns(13);
		oMockMethod.invoke();
		oMockMethod.invoke();
		oMockMethod.invoke();
		assert.throws(function(){
			oMockMethod.invoke();
		});
	})
});