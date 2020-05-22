const multer = require('multer');
const ProductItem = require("../../model/product/product");


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

let upload = multer({ storage: storage }).single("file");


exports.UploadImage = (req, res, next) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })
    
}


exports.addProduct = (req, res, next) => {

    const {body} = req;

    const {
        user,
        DressCode,
        description,
        Category,
        DressType,
        Subtype,
        DressPrice,
        Discount,
        images

    } = body;

    ProductItem.find({
        DressCode
    }).exec()
      .then(product => {

        if(product.length >= 1){
            return res.json({
                message : 'product already exist'
            });
        }else{

            const newproduct = new ProductItem();
            newproduct.UserId = user;
            newproduct.DressCode = DressCode;
            newproduct.Category = Category;
            newproduct.DressType = DressType;
            newproduct.DressPrice = DressPrice;
            newproduct.Discount = Discount;
            newproduct.images = images;
            newproduct.description = description;
            newproduct.Subtype = Subtype;

            newproduct
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        success: true,
                        message: 'Product successfully created'
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        success: false,
                        
                    })
                });

        }
    });
}


exports.getAllProducts = (req, res) => {
    ProductItem.find((err, product) => {
        if(err){
            console.log(err);
        }
        else {
            res.json(product);
        }
    });
}


exports.getProduct = (req, res) => {
    let productid = req.params.id;
    ProductItem.findById(productid)
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
}


exports.editProduct = (req, res) => {

    const {body} = req;

    const {
        user,
        DressCode,
        description,
        Category,
        DressType,
        Subtype,
        DressPrice,
        Discount,
        images

    } = body;

    ProductItem.findById(req.params.id, (err, product) => {
        if (!product)
            res.status(404).send("product data is not found");
        else {

           
            product.UserId = user;
            product.DressCode = DressCode;
            product.Category = Category;
            product.DressType = DressType;
            product.DressPrice = DressPrice;
            product.Discount = Discount;
            product.images = images;
            product.description = description;
            product.Subtype = Subtype;

            product
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        success: true,
                        message: 'Product successfully Updated'
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        success: false,
                        
                    })
                });

        }
    });
}

exports.deleteProduct = (req,res,next) => {
    ProductItem.remove({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "product deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
}