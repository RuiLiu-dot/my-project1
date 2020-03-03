// 引入mongodb
let mongodb = require('mongodb');
// 连接客户端
let mongoClient = mongodb.MongoClient;


/**
 * Database方法 用于封装数据库 简化操作
 * @connectStr	连接字符串 ex: 'mongodb://localhost:27017'
 * @dbname 		数据库名称 ex: 'ickt'
 * @collname 	集合名称   ex: 'students'
 */
function Database(connectStr, dbname, collname) {
	// 安全校验
	if (!(this instanceof Database)) {
		throw new Error('请使用new调用');
	}

	// 赋值
	this.connectStr = connectStr;
	this.dbname = dbname;
	this.collname = collname;
}

// 增加一条数据
Database.prototype.insertOne = function(obj, callback) {
	// 连接数据库
	mongoClient.connect(this.connectStr, { useUnifiedTopology: true }, (err, client) => {
		// 捕获错误
		if (err) {
			// 执行callback
			callback(err);
			return;
		}

		// 连接指定数据库
		let db = client.db(this.dbname);
		// 连接集合
		let coll = db.collection(this.collname);
		// 添加数据
		coll.insertOne(obj, function(err, result) {
			// 断开连接
			client.close();
			if (err) {
				callback(err, null);
				return;
			}
			// 执行到这里说明成功
			callback(null, result);
		})
	})
}

// 增加多条数据
Database.prototype.insertMany = function(arr, callback) {
	// 连接数据库
	mongoClient.connect(this.connectStr, { useUnifiedTopology: true }, (err, client) => {
		// 捕获错误
		if (err) {
			// 执行callback
			callback(err);
			return;
		}

		// 连接指定数据库
		let db = client.db(this.dbname);
		// 连接集合
		let coll = db.collection(this.collname);
		// 添加数据
		coll.insertMany(arr, function(err, result) {
			// 捕获错误信息
			if (err) {
				callback(err, null);
				return;
			}
			// 执行到这里说明成功
			callback(null, result);
			// 断开连接
			client.close();
		})
	})
}

// 封装connect方法 简化操作
function connect(connectStr, dbname, collname, callback) {
	mongoClient.connect(connectStr, { useUnifiedTopology: true }, (err, client) => {
		// 捕获错误
		if (err) {
			// 执行callback
			callback(err);
			return;
		}

		// 连接指定数据库
		let db = client.db(dbname);
		// 连接集合
		let coll = db.collection(collname);

		// 执行callback 并且传递参数
		callback(err, client, coll);
	})
}

// 删除一条数据
Database.prototype.deleteOne = function(obj, callback) {
	// 连接数据库
	connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
		// 捕获错误信息
		if (err) {
			// 执行callback
			callback(err);
			return;
		}

		// 通过coll操作集合
		coll.deleteOne(obj, function(err, result) {
			if (err) {
				callback(err, null);
				return;
			}

			// 成功之后执行callback
			callback(err, result);
			// 断开连接
			client.close();
		})
	})
}

// 删除多条数据
Database.prototype.deleteMany = function(obj, callback) {
	// 连接数据库
	connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
		// 捕获错误信息
		if (err) {
			// 执行callback
			callback(err);
			return;
		}

		// 通过coll操作集合
		coll.deleteMany(obj, function(err, result) {
			if (err) {
				callback(err, null);
				return;
			}

			// 成功之后执行callback
			callback(err, result);
			// 断开连接
			client.close();
		})
	})
}

// 修改一条数据
Database.prototype.updateOne = function(query, updated, callback) {
	// 连接数据库
	connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
		// 捕获错误信息
		if (err) {
			// 执行callback
			callback(err);
			return;
		}

		// 通过coll操作集合
		coll.updateOne(query, updated, function(err, result) {
			if (err) {
				callback(err, null);
				return;
			}

			// 成功之后执行callback
			callback(err, result);
			// 断开连接
			client.close();
		})
	})
}

// 修改多条数据
Database.prototype.updateMany = function(query, updated, callback) {
	// 连接数据库
	connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
		// 捕获错误信息
		if (err) {
			// 执行callback
			callback(err);
			return;
		}

		// 通过coll操作集合
		coll.updateMany(query, updated, function(err, result) {
			if (err) {
				callback(err, null);
				return;
			}

			// 成功之后执行callback
			callback(err, result);
			// 断开连接
			client.close();
		})
	})
}

// 查找一条数据
Database.prototype.findOne = function(obj, callback) {
	// 连接数据库
	connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
		// 捕获错误信息
		if (err) {
			// 执行callback
			callback(err);
			return;
		}

		// 通过coll操作集合
		coll.findOne(obj, function(err, result) {
			if (err) {
				callback(err, null);
				return;
			}

			// 成功之后执行callback
			callback(err, result);
			// 断开连接
			client.close();
		})
	})
}
// 查找多条数据
Database.prototype.findMany = function(obj, callback) {
	// 连接数据库
	connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
		// 捕获错误信息
		if (err) {
			// 执行callback
			callback(err);
			return;
		}

		// 通过coll操作集合
		coll.find(obj).toArray(function(err, result) {
			if (err) {
				callback(err, null);
				return;
			}

			// 成功之后执行callback
			callback(err, result);
			// 断开连接
			client.close();
		})
	})
}

// 使用的时候
// let db = new Database('mongodb://localhost:27017', 'ickt', 'students');

// 暴露接口
module.exports = Database;




