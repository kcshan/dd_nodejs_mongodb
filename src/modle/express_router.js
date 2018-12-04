const url = require('url');

// 封装方法 改变res 绑定res.send()
function changeRes(res) {
  res.send = function (data) {
    res.writeHead(200, {'Content-Type' : 'text/html;charset:utf-8'});
    res.end(data)
  }
}

// 暴露的模块
const Server = function () {
  // 全局变量
  const G = this
  // 处理get和post请求
  this._get = {}
  this._post = {}

  const app = function (req, res) {

    changeRes(res)

    // console.log('app' + req)
    let pathname = url.parse(req.url).pathname
    if (!pathname.endsWith('/')) {
      pathname = pathname + '/'
    }
  
    // 获取请求的方式
    const method = req.method.toLowerCase()

    if (G['_' + method][pathname]) {
      if (method == 'post') {
        // 执行post请求
        let postData = ''
        req.on('data', function (chunk) {
          postData += chunk
        })
        req.on('end', function () {
          // 表示拿到post的数据
          req.body = postData
          G['_' + method][pathname](req, res)
        })
      } else {
        // 执行get请求
        G['_' + method][pathname](req, res)
      }
      
    } else {
      res.end('no router')
    }
  }
  
  // 定义一个get方法
  app.get = function (string, callback) {
  
    if (!string.endsWith('/')) {
      string = string + '/'
    }
  
    if (!string.startsWith('/')) {
      string = '/' + string
    }
  
    G._get[string] = callback
  }

  // 定义一个post方法
  app.post = function (string, callback) {
  
    if (!string.endsWith('/')) {
      string = string + '/'
    }
  
    if (!string.startsWith('/')) {
      string = '/' + string
    }
  
    G._post[string] = callback
  }
  
  return app
}

module.exports = Server()