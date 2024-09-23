/**
 * Resolvers are functions that determine how to fetch the data associated with each field in the schema.
 */

// import { users } from '../dummy/data.js';
import User from '../models/user.model.js';

import bcrypt from 'bcryptjs';

const userResolver = {
    Query: {
        /**
         * Get all users
         */
        users: async () => {
            try {
                const users = await User.find();
                return users;
            } catch (error) {
                throw new Error(error.message);
            }
        },

        /**
         * Get user by id
         * @param {*} _ 
         * @param {*} param1 
         * @returns 
         */
        user: async (_, { userId }) => {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found.");
            }
            return user;
        },

        /**
         * Get authenticated user
         * @param {*} _ 
         * @param {*} __ 
         * @param {*} context 
         * @returns 
         */
        authUser: async (_, __, context) => {
            try {
                const user = await context.getUser();
                return user;
            }
            catch (error) {
                console.log("Error in authUser", error);
                throw new Error(error.message);
            }
        },
    },
    Mutation: {
        /**
         * Register function
         * @param {*} _
         * @param {*} param1 input object 
         * @param {*} context  context object
         * @returns 
         */
        register: async (_, { input }, context) => {
            try {
                const { username, password, name, gender } = input;
                if (!username || !password || !name || !gender) {
                    throw new Error("All fields are required.");
                }
                const exisitingUser = await User.findOne({ username });
                if (exisitingUser) {
                    throw new Error("User already exists.");
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = new User({
                    username,
                    password: hashedPassword,
                    name,
                    gender,
                    profilePicture: gender === 'female' ? femaleProfilePic : maleProfilePic,
                });

                await newUser.save();
                await context.login(newUser);
                return newUser;

            } catch (error) {
                throw new Error(error.message);
            }
        },

        /**
         * Login function
         * @param {*} _ 
         * @param {*} param1 
         * @param {*} context 
         * @returns 
         */
        login: async (_, { input }, context) => {
            try {
                const { username, password } = input;
                const { user } = await context.authenticate('graphql-local', { username, password });

                await context.login(user);
                return user
            }
            catch {
                console.log("Error in login", error);
                throw new Error(error.message);
            }
        },


        /**
         * Logout function
         * @param {*} _ 
         * @param {*} _ 
         * @param {*} context  
         * @returns 
         */
        logout: async (_, __, context) => {
            try {
                await context.logout();
                req.session.destroy((err) => {
                    if (err) {
                        throw new Error(err.message);
                    }
                })
                res.clearCookie('connect.sid');
                return { message: "Logged out successfully." };
            } catch (error) {
                throw new Error(error.message);
            }
        }
    }
};

export default userResolver;
