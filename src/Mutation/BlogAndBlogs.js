import BlogsModel from "../models/Blogs"
import { GraphQLError, GraphQLObjectType, GraphQLString } from "graphql";
import jwt from "jsonwebtoken";
import fields from "../helperFields/BlogAndBlogs"
import User from "../models/User";

const secretKey = "secretKey"

const addBlog = {
    type: new GraphQLObjectType({
        name: "addBlog",
        fields
    }),
    args: {
        token: { type: GraphQLString },
        name: { type: GraphQLString },
        content: { type: GraphQLString }
    },
    resolve: (parentValue, args) => {
        const newBlog = new BlogsModel({
            ...args, createdBy: args.token
        });
        const { _id } = jwt.verify(args.token, secretKey)
        newBlog.save().then(res => res).catch(er => console.log("er adduser", { er }))
        User.findByIdAndUpdate(_id, {
            "$push": { "blogs": newBlog }
        }).then(res => res).catch(er => er)
        return newBlog;
    }
};

const editBlog = {
    type: new GraphQLObjectType({
        name: "editBlog",
        fields
    }),
    args: {
        id: { type: GraphQLString },
        token: { type: GraphQLString },
        name: { type: GraphQLString },
        content: { type: GraphQLString },
    },
    resolve: (parentValue, args) => {
        return BlogsModel.findById(args.id)
            .then(({ createdBy, name, content }) => {
                if (createdBy === args.token) {
                    const id = args.id;
                    const update = {
                        name: args.name || name,
                        content: args.content || content
                    };
                    console.log({ update });
                    return BlogsModel.findByIdAndUpdate(id, {
                        $set: update
                    })
                        .then(res => {
                            console.log("updateres", { res });
                            return {
                                ...update,
                                createdBy,
                                _id: id

                            }
                        })
                        .catch(er => console.log("er edit", { er }))

                } else {
                    return new GraphQLError({
                        errorCode: 404,
                        errorMessage: "You aren't the owner of this blog, you cant delete it"
                    })
                }
            })
            .catch(er => console.log({ er }))
    }
};

const deleteBlog = {
    type: new GraphQLObjectType({
        name: "deleteBlog",
        fields
    }),
    args: {
        id: { type: GraphQLString },
        token: { type: GraphQLString },
    },
    resolve: (parentValue, args) => {
        return BlogsModel.findById(args.id)
            .then(({ createdBy }) => {
                if (createdBy === args.token) {
                    return BlogsModel.findByIdAndDelete(args.id)
                        .then(res => res)
                        .catch(er => er)

                } else {
                    return new GraphQLError({
                        errorCode: 404,
                        errorMessage: "You aren't the owner of this blog, you cant delete it"
                    })
                }
            })
            .catch(er => console.log({ er }))

    }
};


export {
    addBlog,
    editBlog,
    deleteBlog
};
