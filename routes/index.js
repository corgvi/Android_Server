var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const {Schema} = require("mongoose");
const e = require("express");
//  bước 1 : kết nối vào csdl qua link với username, password
// tên của csdl là demo
const uri = "mongodb+srv://admin:cuong2001@cluster0.jsesy.mongodb.net/poly1?retryWrites=true&w=majority";
mongoose.connect(uri).catch(err => console.log('co loi xay ra'));

// bước 2 : khai báo kiểu dữ liệu - khung của dữ liệu - model và collection
// _id:62e229de28a3a68729705ef0
// name:"Huy Nguyen Huun3333"
// number:"0913456789"
// address:"HaNoi city"

const itemSchema = new Schema({
  noidung: String,
  ngay: String,
  link: String
})

const itemModel = mongoose.model('images', itemSchema)

/* kết nối và lấy danh sách */
/* GET home page. */
router.get('/', function (req, res, next) {

  // tim kiem : dk {}
  itemModel.find({}, function (error, result) {
    if (error) throw error;
    console.log(result.length)
    res.render('index', {title: 'Express', data: result});
  })
});
router.get('/delete/', function (req, res) {

  const id = req.query.id;
  itemModel.deleteOne({_id: id}, function (error) {
    if (error) throw error;
    res.send('Xoa thanh cong!!!');
  })

})

router.get('/updateForm/', function (req, res) {

  const id = req.query.id;
  itemModel.findOne({_id: id}, function (error, result) {
    res.render('update', {title: 'Update', data: result})
  })

})

router.post('/update', async function (req, res) {
  const id = req.body.id;
  const noidung = req.body.noidung;
  const ngay = req.body.ngay;
  const link = req.body.link;


  await itemModel.updateOne({_id: id}, {
    noidung: noidung,
    ngay: ngay,
    link: link
  }, null)

  res.redirect('/')
})

router.post('/create', async function (req, res) {
  const id = req.body.id;
  const noidung = req.body.noidung;
  const ngay = req.body.ngay;
  const link = req.body.link;

  var item = new itemModel({
    noidung: noidung,
    ngay: ngay,
    link: link
  })

  await item.save();

  res.redirect('/')
})

router.get('/getUsers', function (req, res) {
  const itemList = mongoose.model('images', itemSchema);

  itemList.find({}, function (error, result) {
    if(error){
      console.log(error)
    }
    res.send(result);
  })
})

module.exports = router;
