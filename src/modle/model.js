const ejs = require('ejs')
const fs = require('fs')

let app = {
  login: function (req, res) {
    ejs.renderFile('views/form.ejs', function (err, data) {
      res.end(data)
    })
  },
  register: function (req, res) {
    ejs.renderFile('views/register.ejs', function (err, data) {
      res.end(data)
    })
  },
  doLogin: function (req, res) {
    res.end('doLogin get')
  },
  home: function (req, res) {
    res.end('home')
  },
}
module.exports = app
