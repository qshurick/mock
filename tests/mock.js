var Mock = require('./../src/mock'),
	assert = require('assert');

describe('Mock', function(){
	it('should create simple mock', function(){
		var oMock = new Mock();
		assert.ok(oMock);
	});
	it('should create a mock with a specific method', function(){
		var oMock = new Mock();
		oMock.method('callMe').returns(42);
		assert.equal('function', typeof oMock.callMe);
		assert.equal(42, oMock.callMe());
	});
});