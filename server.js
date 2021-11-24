const express = require( 'express' );
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');


mongoose.connect( 'mongodb://localhost/users_db', {useNewUrlParser:true} );

const { UserModel } = require('./models/userModel');

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/static') );
app.use(session({secret: 'verySecret'}));
app.use(flash());

app.use( express.urlencoded({ extended: true }) );


//render index form
app.get("/", function( request, response ){
    response.render( 'index' );
});

//create info to send to results
app.post("/", function( request, response ){
    console.log(request.body);

    const name = request.body.name;
    const quotes = request.body.quote;

    const newUser = {
        name,
        quotes
    };
    console.log( newUser );
    UserModel
        .createUser( newUser )
        .then( result => {
            console.log(result);
            response.redirect('/results');
        })
        .catch( err => {
            console.log( "Something went wrong!", err );
            request.flash( 'messageError', 'You have to fill all the spaces!' );
            response.redirect( '/' );
            //for (var key in err.errors) {
                //request.flash('messageError', err.errors[key].message);
               // response.redirect( '/' );
            //}
        })

    
});

//render index form
app.get("/results", function( request, response ){
    UserModel
        .getQuotes()
        .then( data =>{
            console.log(data);
            response.render( 'results', {users:data});
        } )

});


app.listen(7077, function() {
    console.log("running on port 7077");
});