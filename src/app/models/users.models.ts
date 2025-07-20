import { IAddress, IUser, UserInstanceMethods, UserStaticMethods } from './../interfaces/user.interface';
import { Model, model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"

const addressSchema = new Schema<IAddress>({
      city: {type:String},
      street: {type: String},
      zip: {type: Number }
},{
   _id: false,
   versionKey:false,
})

const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods >({
     firstName:{
        type: String,
        required: [true, 'first name is required'],
        trim: true,
        minlength: [3, 'first name at least 3 character you put {VALUE}']
     },
     lastName:{
        type: String,
        required: true,
        trim: true
     },
     age:{
        type:Number,
        required:true,
        min:18,
        max: 60
     },
     email: {
        type: String,
        unique: [true, 'email already taken'],
        required: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "invalid email send {VALUE}}"]
     },

     password: {
      type: String,
      required: true,
     },
     role: {
       type: String,
       uppercase: true,
       enum: {
           values: ['USER', 'ADMIN', 'SUPERADMIN'],
           message: "your role is invalid {VALUE}"
       },
       default: 'USER'
     },
     address:{
         type:addressSchema
     } 

},{
   versionKey:false,
   timestamps:true,
})

userSchema.method("hashPassword", async function(plainPassword:string){
   const password = await bcrypt.hash(plainPassword, 10)
   this.password = password
   return password
})

userSchema.static("hashPassword", async function(plainPassword:string){
   const password = await bcrypt.hash(plainPassword, 10)
   return password
})

export const User = model<IUser, UserStaticMethods>('User', userSchema)