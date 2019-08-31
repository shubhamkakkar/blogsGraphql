import {GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLError} from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/User"

const saltRounds = 10;
const secretKey = "secretKey";
// TODO: input validation
const fields = {
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    role: {type: GraphQLString},
    token: {type: GraphQLString},
    newUser: {type: GraphQLBoolean}
};

function hashedPasswordGenerator(password) {
    return bcrypt.hash(password, saltRounds)
        .then(hashedPassword => hashedPassword);
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
                    newUser
                        .save()
                        .then(res => res)
                        .catch(er => {
                            return new GraphQLError({
                                    errorCode: 500,
                                    message: `Timeout`,
                                    error: er
                                }
                            )
                        });
                    const token = jwt.sign({...newUser}, secretKey);
                    return {
                        ...newUser,
                        token
                    }
                } else {
                    const doc = res._doc;
                    const token = jwt.sign({...doc}, secretKey);
                    return {
                        ...doc,
                        token,
                        newUser: false
                    }
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
        token: {type: GraphQLString},
    },
    resolve: async (parentValue, {email, password, token}) => {
        return User.findOne({email})
            .then(res => {
                if (res !== null) {
                    const doc = res._doc;
                    const hashPasswordCompareBool = bcrypt.compareSync(password, doc.password)
                    if (hashPasswordCompareBool) {
                        return {...doc, token}
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
