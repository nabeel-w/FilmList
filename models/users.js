import { Schema, model, models } from "mongoose";

const filmSchema= new Schema({
    id:{
        type:String,
        unique: false,
        sparse:true
    },
    watched:{
        type:Boolean
    }
})

const userSchema = new Schema({
    email:{
        type:String,
        unique:[true,'Email Already Exists'],
        required:[true,'Email is Required']
    },
    password:{
        type:String
    },
    image:{
        type:String
    },
    movies:[{
        type:filmSchema,
        sparse:true,
        unique:false
    }]
});

const User= models.User || model('User',userSchema);

export default User;