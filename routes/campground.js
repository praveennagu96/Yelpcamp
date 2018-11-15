var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


//INDEX - show all campgrounds
router.get("/", function(req,res){
    //Get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
             res.render("campground/index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE -  add new campgrounds to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to campground array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampgrounds = {name: name, price: price, image: image, description: desc, author: author};
    // Create new Campground and save to DB
    Campground.create(newCampgrounds, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else {
             res.redirect("/campgrounds");
        }
        });
 });

//NEW - show form to create new campground.
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campground/new");
});

router.get("/:id", function(req, res){
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundedCampground){
        if(err){
            console.log(err);
        }
        else{
             res.render("campground/show",{campground: foundedCampground});
        }
  });
});

//Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
            Campground.findById(req.params.id, function(err, foundedCampground){
                 res.render("campground/edit", {campground: foundedCampground});
     });
});

//Update Campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedcampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            req.flash("success", "You updated successfully!!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       }
       else{
            res.redirect("/campgrounds");
       }
   }); 
});




module.exports = router;