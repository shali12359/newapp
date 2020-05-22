const WishlistItems = require("../../model/wishlist/wishlist");

// Method for add wishlist items
exports.addItem = (req, res, next) => {

  const Subtype = req.body.Subtype;
  const DressPrice = req.body.DressPrice;
  const Images = req.body.Images;
  const UserId = req.body.UserId;
  const ProductId = req.body.ProductId;


    // WishlistItems.find({
    //   UserId, Subtype
    // }).exec()
    //   .then(listItem => {
    //
    //         if(listItem.length >= 1){
    //             return res.json({
    //                 message : 'Already in Wishlist..!'
    //             });
    //         }
    //
    //         else{
                const newlistItem = new WishlistItems({
                  Subtype,
                  DressPrice,
                  Images,
                  UserId,
                  ProductId
                });

                newlistItem
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            message: 'Added to Wishlist..'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
            // }
    // });
}

// Method for get all wishlist items
exports.getAllItems = (req, res) => {
    WishlistItems.find((err, listItem) => {
        if(err){
            console.log(err);
        }
        else {
            res.json(listItem);
        }
    });
}

// Method for delete wishlist items
exports.deleteItem = (req,res) => {
    WishlistItems.remove({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Item deleted..!"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
}
