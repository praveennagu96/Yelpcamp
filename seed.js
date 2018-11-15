var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");


var data = [
            {name: "Cloud's Rest",
             image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f1c871a4ebbdb9_340.jpg",    
             description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            },
            {name: "Desert Mesa",
             image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f1c871a4ebbdb9_340.jpg",    
             description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            },
            {name: "Canyon floor",
             image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144594f9c97aa1e5b4_340.jpg",    
             description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
];
function seedDB(){
    Campground.remove({}, function(err){
       if(err){
           console.log(err);
       } 
       else{
           console.log("Campground removed");
            data.forEach(function(seed){
                 Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Added Campground");
                    Comment.create(
                        {
                        text: "This is awesoe place but I wish there was internet",
                        author: "Homer"
                        },function(err, comment){
                            if(err){
                                console.log(err);
                            }
                            else{
                                campground.comments.push(comment);
                                campground.save(comment);
                                console.log("created new comment");
                            }
                        });
                    }
               });
         });
       }
  });
}

module.exports = seedDB;
