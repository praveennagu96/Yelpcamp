var Campground = require("../models/campground");
var Comment = require("../models/comments");

//all middleware goes here
var middlewareobj = {};

middlewareobj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundedCampground){
            if(err){
                 req.flash("error", "Campground not found");
                 res.redirect("back");
            }
            else{
                //does user owm the campground?
               if(foundedCampground.author.id.equals(req.user._id)){
                  next();
               }
               else{
                   req.flash("error", "You don't have permission to do that!");
                   res.redirect("back");
               }
            }
        });
    }
    else{
        req.flash("error", "You need to be Logged to do that!");
        res.redirect("back");
    }
};
    


middlewareobj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundedComment){
            if(err){
                res.redirect("back");
            }
            else{
                //does user owm the campground?
               if(foundedComment.author.id.equals(req.user._id)){
                  next();
               }
               else{
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
            }
        });
    }
    else{
        req.flash("error", "You need to be Logged to do that!");
        res.redirect("back");
    }
};

middlewareobj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be Logged to do that!");
    res.redirect("/login");
};


module.exports = middlewareobj;