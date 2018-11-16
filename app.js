var express     =   require("express"),
    app         =   express(),
    bodyParser  =   require("body-parser"),
    mongoose    =   require("mongoose"),
    flash       =   require("connect-flash"),
    passport    =   require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User        =   require("./models/user"),
    seedDB      =   require("./seed");
    
    //requiring routes
    var commentRoutes = require("./routes/comment"),
        campgroundRoutes = require("./routes/campground"),
        indexRoutes = require("./routes/index");
 
// mongoose.connect('mongodb://localhost:27017/yelp_camp_v4', { useNewUrlParser: true }); 
 mongoose.connect('mongodb:praveen:nagu1996@ds041377.mlab.com:41377/camp007', { useNewUrlParser: true });
//  mongoose.connect(ds041377.mlab.com, {
//   auth: {
//     user: praveen,
//     password: nagu1996
//   },
//   { useNewUrlParser: true }
// });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//Passport Configuration
app.use(require("express-session")({
    secret: "Rusty Win the Game!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp has Started");
});