import BlogsModel from "../models/Blogs"
import { GraphQLObjectType, GraphQLString,GraphQLID  } from "graphql";

import fields from "../helperFields/BlogAndBlogs"

const addBlog = {
    type: new GraphQLObjectType({
        name: "addBlog",
        fields
    }),
    args: {
        name: { type: GraphQLString },
        createdBy: { type: GraphQLID },
        content: { type: GraphQLString }
    },
    resolve: (parentValue, args) => {
        const newBlog = new BlogsModel(args)
        newBlog.save().then(res => res).catch(er => console.log("er adduser", { er }))
        return newBlog;
    }
}

const editBlog = {
    type: new GraphQLObjectType({
        name: "editBlog",
        fields
    }),
    args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        content: { type: GraphQLString }
    },
    resolve: (parentValue, args) => {
        const updatedBlog = BlogsModel.findByIdAndUpdate(args.id, args) 
        .then(res => res)
        .catch(er => console.log({ er }))
        return updatedBlog   
    }
}

const deleteBlog = {
    type: new GraphQLObjectType({
        name: "deleteBlog",
        fields
    }),
    args: {
        id: { type: GraphQLString },
    },
    resolve: (parentValue, args) => {
        BlogsModel.findByIdAndDelete(args.id) 
        .then(res => console.log({ res }))
        .catch(er => console.log({ er }))
        return "Blog Deleted"
    }
}


export {
    addBlog,
    editBlog,
    deleteBlog
};