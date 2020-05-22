const Comments = require("../../model/Comment/comment");

// Method for add new comment
exports.addComment = (req, res) => {
    const Comment = req.body.Comment;
    const Review = Number(req.body.Review);
    const date = Date.parse(req.body.date);
    const ProductId = req.body.ProductId;
    const UserId = req.body.UserId;
    const Username = req.body.Username;


            const newComment = new Comments({
              Comment,
              Review,
              date,
              ProductId,
              UserId,
              Username
            });

            newComment
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Comment Added..'
                    })
                })
                .catch(err => {
                    console.log(err);
                });
}

// Method for get all comments
exports.getAllComments = (req, res) => {
    Comments.find((err, comment) => {
        if(err){
            console.log(err);
        }
        else {
            res.json(comment);
        }
    });
}

exports.getComment = (req, res) => {
    let commentid = req.params.id;
    Comments.findById(commentid)
    .then(comment => res.json(comment))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateComment = (req, res) => {
  Comments.findById(req.params.id)
    .then(comment => {
      comment.Comment = req.body.Comment;
      comment.Review = req.body.Review;

      comment.save()
        .then(() => res.json('Comment Updated..'))
          .catch(err => res.status(400).json('Error: ' + err));
    })
      .catch(err => res.status(400).json('Error: ' + err));
}

// Method for delete comment
exports.deleteComment = (req,res) => {
    Comments.remove({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Comment deleted..!"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
}
