const express = require('express')
const path = require('path')

// using hbs npm
const hbs = require('hbs')

// define paths for express configa
const viewsPath = path.join(__dirname, '../templates/views')
const app = express()
const partialPath = path.join(__dirname, '../templates/partials')
// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


// getting resource at url
// using path to go to public dir that has the index.html
// going to /index.html would lead to html code into website
const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'created by Nguyen'
  }) //use render for hbs
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'created by Nguyen'
  }) //use render for hbs
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helptext: 'you get none',
    name: 'created by Nguyen'
  }) //use render for hbs
})

// if typed in url with /weather, data below is shown
app.get('/weather', (req, res) => {
  res.send({
    forecast: 'Sunny',
    location: 'Sumter'
  })
})

app.get('/help/*', (req,res) => {
  res.render('404page',{
    title: 404,
  error: 'help article not found'})
})

// 404 page should be at the end cause we want to check previous request
app.get('*', (req, res) => {
  res.render('404page', {
      title: 404,
  error: 'page not found'})
})

app.listen(3000, () => {
  console.log('server is up on port 3000')
})
