import { GraphQLObjectType } from "graphql"

import { blogs, blog } from "./BlogAndBlogs"

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: () => ({
        blogs,
        blog
    })
});

export default RootQuery