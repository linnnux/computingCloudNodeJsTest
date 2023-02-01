//controllers productController.js

const Product = require('../models/productModel');
var formidable = require('formidable');
var fs = require('fs');
let form =
          `<form action="/api/product" method="post" enctype="multipart/form-data">
            <input type="text" name="userId" value = "userid">
            <br><br>
            <input type="text" name="title" value="title">
            <br><br>
            <input type="text" name="description" value = "description">
            <br><br>
            <input type="number" name="price" value = "99.99">
            <br><br>
            <input type="file" name="image">
            <br><br>
            <input type="submit">
          </form>`;

exports.upload = (req, res, next) => {

    console.log(req.body.title);
    var form = new formidable.IncomingForm();

    const { body, validationResult } = require("express-validator");
    form.parse(req, function (err, fields, files)
    {

      var oldpath = files.filetoupload.filepath;
      console.log('old path = '+oldpath);
      actualPath = __dirname;
      console.log('actual path : ', actualPath);

      var newpath = actualPath + '/../uploads/img/' + files.filetoupload.originalFilename;
      console.log('new path = '+ newpath);
      //var newpath = `${req.protocol}://${req.get('host')}/images/${files.filetoupload.originalFilename}`
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });


};



exports.form = (req, res, next) => {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(form);
    return res.end();


};


exports.createProductWithImg = (req, res, next) => {
//const productObject = JSON.parse(req.body.product);
console.log('hello');
   const product = new Product({

       title: req.body.title,
       description: req.body.description,
       imageUrl: req.body.imageUrl,
       price: req.body.price,
       userId: req.body.userId,

       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   });

   product.save()
   .then(() => { res.status(201).json({message: 'produc added'})})
   .catch(error => { res.status(400).json( { error })})
};

exports.createProduct = (req, res, next) => {

  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  product.save().then(
    () => {
      res.status(201).json({
        message: 'Product added !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneProduct = (req, res, next) => {
  Product.findOne({
    _id: req.params.id
  }).then(
    (product) => {
      res.status(200).json(product);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyProduct = (req, res, next) => {
  const product = new Product({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Product.updateOne({_id: req.params.id}, product).then(
    () => {
      res.status(201).json({
        message: 'Product updated!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllProduct = (req, res, next) => {

  Product.find().then(
    (products) => {
      res.status(200).json(products);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
exports.addProduct = (req, res, next) => {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(form);
    res.end();
};
