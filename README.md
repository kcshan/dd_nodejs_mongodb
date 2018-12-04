# 使用nodejs操作mongodb增删改查
* cnpm install mongodb --save-dev
# nodejs连接数据库
* 1. 创建MongoClient
``` javascript
const MongoClient = require('mongodb').MongoClient
```
* 2. 创建mongodb的地址
``` javascript
const MongoClient = require('mongodb').MongoClient
```
* 3. 连接数据库
``` JavaScript
MongoClient.connect(mongo_url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      console.log('连接数据库失败')
      console.log(err)
      return
    }
    console.log('连接数据库成功')
  })
```
* 4. 实现增删改查
``` javascript
MongoClient.connect(mongo_url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      console.log('连接数据库失败')
      console.log(err)
      return
    }
    let dbo = db.db("study");
    // 增加数据
    dbo.collection('user').insertOne({
      "name": "node.js2",
      "age": 10
    }, function (error) {
      if (error) {
        console.log('增加数据失败')
        console.log(error)
        return
      }
      res.send('add data success')
      // 关闭数据库
      db.close()
    })
  })
```