const express = require("express")
const indexRouter = express.Router()


indexRouter.get('/', (req, res) => {
  res.render('index')
})

indexRouter.get('/badpage', (req, res) => {
  res.render('404')
})

indexRouter.get('*', (req, res) => {
  res.redirect('/badpage')
})
module.exports = indexRouter
