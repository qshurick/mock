'use strict';

var MockMethod = function(name) {
	this.name = name;
	this.results = [];
};

MockMethod.prototype.returns = function(result) {
	this.results.push(result);
	return this;
};

MockMethod.prototype.invoke = function() {
	if (this.results.length) {
		return this.results.shift();
	}
	throw new Error('Mock Error: nothing to return in `' + this.name + '` method');
};

MockMethod.wrap = function(oMockMethod) {
	return function() {
		return oMockMethod.invoke();
	}
};

module.exports = MockMethod;