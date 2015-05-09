'use strict';

var MockMethod = require('./mock-method'),
	Mock = function() {};

Mock.prototype.method = function(name) {
	var oMockMethod = new MockMethod(name);
	this[name] = MockMethod.wrap(oMockMethod);
	return oMockMethod;
};

module.exports = Mock;