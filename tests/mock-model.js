var assert = require('assert'),
	ModuleMock = require('./../src/mock-model');

describe('ModuleMock', function(){
	it('should create empty module mock object', function(){
		var oModuleMock = new ModuleMock();
		assert.ok(oModuleMock);
	});
	it('should find data in mock object', function(done){
		var data = { id: 1, value: 'hello, world' },
			oModuleMock = new ModuleMock();
		oModuleMock.with(data);
		oModuleMock.find(1).then(function(dbData){
			assert.deepEqual(dbData, data);
			done();
		})
	});
	it('should find all data in mock', function(done){
		var data = [
				{ id: 1, value: 'hello, world' },
				{ id: 2, value: 'qwerty' },
			],
			oModuleMock = new ModuleMock();
		oModuleMock.with(data);
		oModuleMock.findAndCountAll().then(function(dbDataList){
			assert.ok(dbDataList);
			assert.deepEqual(data, dbDataList.rows);
			assert.equal(2, dbDataList.count);
			done();
		});
	});
	it('should create new item in mock', function(done){
		var data = { value: 'hello, world' },
			id,
			oModuleMock = new ModuleMock();
		oModuleMock.create(data).then(function(dbData){
			assert.equal(data.value, dbData.value);
			assert.ok(dbData.id);
			id = dbData.id;
		}).then(function(){
			return oModuleMock.find(id);
		}).then(function(dbData){
			assert.equal(id, dbData.id);
			assert.equal(data.value, dbData.value);
			done();
		}).catch(function(reason){
			console.error(reason);
			console.error(reason.stack);
		});
	});
	it('should change item in mock', function(done){
		var data = { id: 1, value: 'hello, world' },
			newData = { value: 'qwerty' },
			oModuleMock = new ModuleMock();
		oModuleMock.with(data);
		oModuleMock.update(newData, { where: { id: data.id }}).then(function(description){
			assert.deepEqual(description, [1]);
			return oModuleMock.find(1);
		}).then(function(dbData){
			assert.deepEqual(newData, dbData);
			done();
		})
	});
	it('should return empty item', function(done){
		var oModuleMock = new ModuleMock();
		oModuleMock.find(1).then(function(dbData){
			assert.equal(dbData, undefined);
			done();
		}).catch(function(reason){
			console.error(reason);
			console.error(reason.stack);
		});
	});
	it('should return false if changing not existed data', function(done){
		var oModuleMock = new ModuleMock();
		oModuleMock.update({ value: 'xxx' }, { where: { id: 2 }}).then(function(description){
			assert.deepEqual(description, [0]);
			done();
		});
	});
	it('should increment ID if there is no id in data', function(done){
		var oModuleMock = new ModuleMock(),
			data1 = { id: 5, value: 'Hello!' },
			data2 = { value: 'World!' };
		oModuleMock.create(data1).then(function(){
			return oModuleMock.create(data2);
		}).then(function(){
			return oModuleMock.findAndCountAll({});
		}).then(function(dbDataList){
			assert.equal(dbDataList.count, 2);
			assert.equal(dbDataList.rows[0].id, data1.id);
			assert.equal(dbDataList.rows[0].value, data1.value);
			assert.equal(dbDataList.rows[1].id, data1.id + 1);
			assert.equal(dbDataList.rows[1].value, data2.value);
			done();
		}).catch(function(reason){
			console.error(reason);
			console.error(reason.stack);
		});
	});
	it('should return create error on request', function(done){
		var oModuleMock = new ModuleMock();
		oModuleMock
			.failNextCreate()
			.create({})
			.then(function(dbData){
				assert.equal(dbData, null);
				done();
			});
	});
	it('should return update error on request', function(done){
		var oModuleMock = new ModuleMock();
		oModuleMock
			.with({ id: 2 })
			.failNextUpdate()
			.update({}, { where: { id: 1 }})
			.then(function(description){
				assert.deepEqual(description, [2]);
				done();
			}).catch(function(reason){
			console.error(reason);
			console.error(reason.stack);
		});
	});
});