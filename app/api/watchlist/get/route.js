import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import User from "@models/users";

const find=async(req)=>{
    const { userId }= await req.json();
    try {
        await connectToDB();
        const userFound= await User.findOne({ _id: userId });
        if(userFound){
            const movies= userFound.movies;
            return new NextResponse(JSON.stringify({ movies }),{status:200});
            }
        else return new NextResponse(JSON.stringify({err:"User not found"}),{status:401});
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({err:"Server Error"}),{status:500});
    }

}

export { find as POST }