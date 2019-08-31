import BlogsModel from "../models/Blogs"
import {GraphQLError, GraphQLObjectType, GraphQLString} from "graphql";
import jwt from "jsonwebtoken";

import fields from "../helperFields/BlogAndBlogs"

//  TODO: token is required to identify which user added this blog,  thus attach token's id to createdBy

const secretKey = "secretKey";
const decoded = (token) => jwt.verify(token, secretKey);


const addBlog = {
    type: new GraphQLObjectType({
        name: "addBlog",
        fields
    }),
    args: {
        token: {type: GraphQLString},
        name: {type: GraphQLString},
        content: {type: GraphQLString}
    },
    resolve: (parentValue, args) => {
        const newBlog = new BlogsModel({
            ...args, createdBy: args.token
        });
        newBlog.save().then(res => res).catch(er => console.log("er adduser", {er}))
        return newBlog;
    }
};

const editBlog = {
    type: new GraphQLObjectType({
        name: "editBlog",
        fields
    }),
    args: {
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        content: {type: GraphQLString},
        token: {type: GraphQLString},
    },
    resolve: (parentValue, args) => {

    }
};

const deleteBlog = {
    type: new GraphQLObjectType({
        name: "deleteBlog",
        fields
    }),
    args: {
        id: {type: GraphQLString},
        token: {type: GraphQLString},
    },
    resolve: (parentValue, args) => {
        BlogsModel.findByIdAndDelete(args.id)
            .then(res => console.log({res}))
            .catch(er => console.log({er}))
        return "Blog Deleted"
    }
}


export {
    addBlog,
    editBlog,
    deleteBlog
};
