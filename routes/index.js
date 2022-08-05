var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Log in' });
});

router.get('/insertProduct', function (req, res){
  res.render('insertProduct', {title: 'Insert Product'})
})

router.get('/updateProduct', function (req, res) {
  res.render('updateProduct', {title: 'Update Product'})
})

router.get("/insert", function (req, res) {
  res.render('insert', {title: 'Insert Product'})
})
module.exports = router;
