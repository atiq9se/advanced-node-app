import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>({
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
        trim: true
     },
     password: {
      type: String,
        required: true
     },
     role: {
       type: String,
       uppercase: true,
       enum: {
           values: ['user', 'admin', 'superadmin'],
           message: "your role is invalid {values}"
       },
       default: 'user'
     }

})


export const User = model('User', userSchema)