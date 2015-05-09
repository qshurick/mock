'use strict';

var Q = require('q'),
	ModuleMock = function(){
		this.data = {};
	};

ModuleMock.prototype.failNextCreate = function(permanent) {
	this.failCreate = true;
	this.permanentCreate = permanent;
	return this;
};

ModuleMock.prototype.failNextUpdate = function(permanent) {
	this.failUpdate = true;
	this.permanentUpdate = permanent;
	return this;
};

ModuleMock.prototype.with = function(data) {
	if (data instanceof Array) {
		data.forEach(function(item){
			this.data[item.id] = item;
		}, this);
	} else {
		this.data[data.id] = data;
	}
	return this;
};

ModuleMock.prototype.find = function(id){
	var result;
	if (this.data[id]) {
		result = this.data[id];
	}
	return Q(result);
};

ModuleMock.prototype.findAndCountAll = function() {
	var list = [];
	Object.keys(this.data).forEach(function(id){
		list.push(this.data[id]);
	}, this);
	return Q({
		rows: list,
		count: list.length
	});
};

ModuleMock.prototype.create = function(data) {
	if (this.failCreate) {
		this.failCreate = this.permanentCreate;
		return Q(null);
	}
	if (!data.id) {
		var id = 0;
		Object.keys(this.data).forEach(function(itemId){
			id = Math.max(itemId, id);
		}, this);
		data.id = id + 1;
	}
	this.with(data);
	return Q(data);
};

ModuleMock.prototype.update = function(data, where) {
	var id = where.where.id;
	if (this.failUpdate) {
		this.failUpdate = this.permanentUpdate;
		return Q([2]);
	}
	if (this.data[id]) {
		this.data[id] = data;
		return Q([1]);
	}
	return Q([0]);
}

module.exports = ModuleMock;
