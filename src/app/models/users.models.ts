import { IAddress, IUser, UserInstanceMethods, UserStaticMethods } from './../interfaces/user.interface';
import { Model, model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import { Note } from './notes.models';

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
   toJSON: {virtuals: true},
   toObject: {virtuals: true}
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

//pre hooks
//document middleware

userSchema.pre('save', async function(next){
   this.password = await bcrypt.hash(this.password, 10)
   next()
})

//query middleware
userSchema.pre('find', function(next){
   console.log("inside prefind")
   next()
})

//document middleware
userSchema.post('save', function(doc, next){
   console.log(`${doc.email} has been saved`)
   next()
})

//query middleware
userSchema.post("findOneAndDelete", async function(doc, next){
   if(doc){
      console.log(doc)
      await Note.deleteMany({user:doc._id})
   }
   next()
})

userSchema.virtual("fullname").get(function(){
   return `${this.firstName} ${this.lastName}`
})



export const User = model<IUser, UserStaticMethods>('User', userSchema)