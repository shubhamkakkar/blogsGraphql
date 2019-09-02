import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    blogs: {
        type: Array,
        default: []
    }

}, { collection: "User" });

// newUser: {
//     type: Boolean,
//         required: false
// }

export default model('User', UserSchema);
