import {GraphQLObjectType} from "graphql"

import {blogs, blog} from "./BlogAndBlogs"


const Blogs = {
    blogs,
    blog
};

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: () => ({
        ...Blogs,
    })
});

export default RootQuery
