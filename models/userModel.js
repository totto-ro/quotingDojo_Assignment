const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 20
    }, 
    quotes : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 100
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const User = mongoose.model( 'user', UserSchema );

const UserModel = {
    createUser : function( newUser ){
        return User.create( newUser );
    },
    getQuotes : function( ){
        return User.find().sort( { created_at: -1 } );
    }
};

module.exports = {UserModel};