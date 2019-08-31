import {Schema, model} from "mongoose";

const BlogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {collection: "Blogs"})

export default model('Blog', BlogSchema);
