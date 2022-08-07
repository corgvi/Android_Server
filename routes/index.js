var express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require("body-parser");
var fs  = require('fs');
var multer =require('multer');

app.use(bodyParser.urlencoded(
    { extended:true }
))
app.set("view engine","ejs");
var storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
var upload = multer({storage: storage});

var router = express.Router();
const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const e = require("express");

const uri = "mongodb+srv://admin:cuong2001@cluster0.jsesy.mongodb.net/poly1?retryWrites=true&w=majority";
mongoose.connect(uri).catch(err => console.log('co loi xay ra: ' + err));

var IMAGE = mongoose.Schema({
  content: String,
  date: String,
  img: {
    data: Buffer,
    contentType: String
  }
})
var IMG =mongoose.model('images', IMAGE);

/* GET home page. */
router.get('/', function(req, res, next) {
  IMG.find({}, function (error, result) {
    if (error) throw error;
    console.log(error)
    console.log(result.length)
    res.render('index', {title: 'Express', items: result});
  })
});

router.get('/getImage', function (req, res) {
  const imgList = mongoose.model('images', IMAGE);

  imgList.find({}, function (error, result) {
    res.send(result);
  })
})

router.post('/uploadphoto', upload.single('avatar'), function (req, res) {
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString('base64');
  var final_img = {
    contentType:req.file.mimetype,
    image:new Buffer(encode_img,'base64')
  };
  console.log("post")
  IMG.create(final_img,function(err,result){
    if(err){
      console.log(err);
    }else{
      console.log(result.img.Buffer);
      console.log("Saved To database");
      res.contentType(final_img.contentType);
      res.send(final_img.image);
      res.redirect("/");
    }
  })
})

module.exports = router;
