
const http = require('http');
const ejs = require('ejs')
const url = require('url')
const MongoClient = require('mongodb').MongoClient

const app = require('./modle/express_router')

const mongo_url = "mongodb://127.0.0.1:27017/"

http.createServer(app).listen(8001);

// 执行home方法
app.get('/', function (req, res) {

  MongoClient.connect(mongo_url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      console.log('连接数据库失败')
      console.log(err)
      return
    }
    let dbo = db.db("study");
    // 增加数据
    const result = dbo.collection('user').find()
    let list = []
    result.each(function (error, doc) {
      if (error) {
        console.log(error)
        return 
      } else {
        if (doc != null) {
          list.push(doc)
        } else {
          // ejs.renderFile('views/index.ejs', {list:list}, function (e_err, data) {
          //   if (e_err) {
          //     console.log(e_err)
          //     return 
          //   }
          //   res.send(data)
          //   db.close()
          // })
          console.log(list)
          let str = ''
          list.forEach((item) => {
            str += "name:" + item.name + "/"
          })
          ejs.renderFile('views/index.ejs', {msg: str}, function (err, data) {
            res.send(data)
          })
          db.close()
        }
      }
    })
  })
  
})

// 执行get方法
app.get('/login', function (req, res) {
  ejs.renderFile('views/form.ejs', {}, function (err, data) {
    res.send(data)
  })
})

// 执行register方法
app.get('/register', function (req, res) {
  res.send('register')
})

// 执行news方法
app.get('/news', function (req, res) {
  res.send('news')
})

// 执行doLogin方法
app.post('/doLogin', function (req, res) {
  console.log(req.body)
  res.write("<script>alert('登录成功');history.back()</script>")
})

// 连接数据库并新增数据
app.get('/add', function (req, res) {
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
})

// 连接数据库并修改数据
app.get('/edit', function (req, res) {
  MongoClient.connect(mongo_url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      console.log('连接数据库失败')
      console.log(err)
      return
    }
    let dbo = db.db("study");
    // 增加数据
    dbo.collection('user').updateOne({
      "name": "node.js2"
    }, {
      $set: {"name":"update_nodejs"}
    }, function (error) {
      if (error) {
        console.log('修改数据失败')
        console.log(error)
        return
      }
      res.send('edit data success')
      // 关闭数据库
      db.close()
    })
  })
})

// 连接数据库并删除数据
app.get('/delete', function (req, res) {
  const query = url.parse(req.url, true).query

  MongoClient.connect(mongo_url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      console.log('连接数据库失败')
      console.log(err)
      return
    }
    let dbo = db.db("study");
    // 增加数据
    dbo.collection('user').deleteOne(query, function (error) {
      if (error) {
        console.log('删除数据失败')
        console.log(error)
        return
      }
      res.send('delete data success')
      // 关闭数据库
      db.close()
    })
  })
})

console.log('Server is starting at port 8001')