const CategoryItem = require("../../model/AdminModels/Category");
const multer = require('multer');

//add category
exports.addCategory = (req, res, next) => {

    const {body} = req;

    const {
        CategoryID,
        CategoryType,
        SubType,
        stages,
        description,
        images
    } = body;


    CategoryItem.find({
        CategoryID
    }).exec()
      .then(category => {

        if(category.length >= 1){
            return res.json({
                message : 'Category already exist'
            });
        }else{

            const newCategory = new CategoryItem();
            newCategory.CategoryID = CategoryID;
            newCategory.CategoryType = CategoryType;
            newCategory.SubType = SubType;
            newCategory.stages = stages;
            newCategory.description = description;
            newCategory.images = images;

            newCategory
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Category successfully created'
                    })
                })
                .catch(err => {
                    console.log(err);
                });

        }
    });
}

//get all categories
exports.getAllCategory = (req, res) => {
    CategoryItem.find((err, category) => {
        if(err){
            console.log(err);
        }
        else {
            res.json(category);
        }
    });
}

// exports.getCategory = (req, res) => {
//     let categoryid = req.params.id;
//     CategoryItem.findById(categoryid)
//     .then(category => res.json(category))
//     .catch(err => res.status(400).json('Error: ' + err));
// }


//get specific category value
exports.getCategory = ((req, res) => {
  CategoryItem.findById(req.params.id)
    .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
});


exports.getClickedCategory = (req, res) => {
    let categoryid = req.query.id;

    CategoryItem.find({'CategoryID': {$in:categoryid }})
      .populate('writer')
        .exec((err, category => {
          if (err) return res.status(400).send(err)
          return res.status(200).send(category)
        }))
}

//edit category
exports.editCategory = (req, res) => {
    const {body} = req;

    const {
        CategoryID,
        CategoryType,
        SubType,
        stages,
        description,
        images
    } = body;

    CategoryItem.findById(req.params.id, (err, category) => {
        if (!category)
            res.status(404).send("category is not found");
        else {
            category.CategoryID = CategoryID;
            category.CategoryType = CategoryType;
            category.SubType = SubType;
            category.stages = stages;
            category.description = description;
            category.images = images;

            category.save().then(category => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
}

//delete category
exports.deleteCategory = (req,res,next) => {
    CategoryItem.remove({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Category deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
}


//Insert Image
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