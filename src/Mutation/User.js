import {GraphQLList, GraphQLObjectType, GraphQLString, GraphQLError} from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/User"
import fields from "../helperFields/User"

const saltRounds = 10;
const secretKey = "secretKey";


function hashedPasswordGenerator(password) {
    return bcrypt.hash(password, saltRounds)
        .then(hashedPassword => hashedPassword);
}

function userReturn(doc) {
    const token = jwt.sign({email: doc.email, _id: doc._id, role: doc.role}, secretKey);
    return {
        ...doc,
        token
    }
}

export const signin = {
    type: new GraphQLObjectType({
        name: "signin",
        fields
    }),
    args: {
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    },
    resolve: async (parentValue, {name, email, password}) => {
        const hashedPassword = await hashedPasswordGenerator(password);
        return User.findOne({email})
            .then(res => {
                if (res === null) {
                    const newUser = new User({name, email, password: hashedPassword});
                    return newUser
                        .save()
                        .then(({_doc}) => userReturn(_doc))
                        .catch(er => {
                            return new GraphQLError({
                                    errorCode: 500,
                                    message: `Timeout`,
                                    error: er
                                }
                            )
                        });
                } else {
                    const doc = res._doc;
                    return userReturn(doc);
                }
            })
            .catch(er => {
                return new GraphQLError({
                        errorCode: 500,
                        message: `Timeout`,
                        error: er
                    }
                )
            })
    }
};

export const login = {
    type: new GraphQLObjectType({
        name: "login",
        fields
    }),
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    },
    resolve: async (parentValue, {email, password, token}) => {
        return User.findOne({email})
            .then(res => {
                if (res !== null) {
                    const doc = res._doc;
                    const hashPasswordCompareBool = bcrypt.compareSync(password, doc.password)
                    if (hashPasswordCompareBool) {
                        return userReturn(doc);
                    } else {
                        return new GraphQLError({
                                errorCode: 404,
                                message: `password is wrong`,
                            }
                        )
                    }
                } else {
                    return new GraphQLError({
                            errorCode: 400,
                            message: `User with email: ${email} doesn't exist`
                        }
                    )
                }
            })
            .catch(er => {
                return new GraphQLError({
                        errorCode: 500,
                        message: `Timeout`,
                        error: er
                    }
                )
            })
    }
};
// query
const userObjecType = new GraphQLObjectType({
    name: "allUser",
    fields
});
export const allUserAdmin = {
    type: new GraphQLList(userObjecType),
    args: {},
    resolve: (parentValue, args) => {
        return User.find()
    }
};
