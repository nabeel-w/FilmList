import NextAuth from "next-auth/next";
import GoogleProvide from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@utils/database";
import User from "@models/users";
import bcrypt from "bcrypt";

const handler = NextAuth({
    providers: [
        GoogleProvide({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                signUp: { label: 'Sign Up', type: 'checkbox' }
            },
            async authorize(credentials) {
                await connectToDB();
                if (credentials.signUp) {
                    console.log(credentials);
                    try {
                        const userFound= await User.findOne({email:credentials.email});
                        if(userFound) return null;
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(credentials.password, salt);
                        const user= await User.create({
                            email: credentials.email,
                            password: hashedPassword,
                            image: "https://img.freepik.com/free-icon/user_318-159711.jpg"
                        })
                        return user;
                    } catch (error) {
                        console.log("Error creating user: ", error.message);
                    }
                }
                else{
                    try {
                        const userFound= await User.findOne({email:credentials.email});
                        if(!userFound||userFound.password==null) return null;
                        const success= await bcrypt.compare(credentials.password, userFound.password);
                        if(success) return userFound;
                    } catch (error) {
                        console.log("Error checking if user exists: ", error.message);
                    }
                }
                return null
            }
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            //session.user.movies=sessionUser.movies;

            return session;
        },
        async signIn({ profile }) {
            if(!profile) return true;
            try {
                await connectToDB();
                const userExists = await User.findOne({ email: profile.email });

                // if not, create a new document and save user in MongoDB
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        image: profile.picture,
                    });
                }

                return true
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };