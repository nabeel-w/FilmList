import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import User from "@models/users";

const handler=async(req)=>{
    console.log("API Called");
    const { userId, movieId }= await req.json();
    try {
        await connectToDB();
        const userFound= await User.findOne({ _id: userId });
        const newMovie={
            id:movieId,
            watched:false
        }
        if(userFound){
            userFound.movies.push(newMovie);
            await userFound.save();
            return NextResponse.json({message:"Done"});
        }
        else return new NextResponse(JSON.stringify({err:"Server Error"}),{status:500});
    } catch (error) {
        return new NextResponse(JSON.stringify({err:"Server Error"}),{status:500});
    }
}

const update=async(req)=>{
    console.log("Update Called");
    const { userId, movieId }= await req.json();
    try {
        await connectToDB();
        const userFound= await User.findOne({ _id: userId });
        if(userFound){
            const movieIndex = userFound.movies.findIndex((movie) => movie.id === movieId.toString());
            console.log(movieId);
            if(movieIndex!=-1){
                userFound.movies[movieIndex].watched = true;
                await userFound.save();
                return new NextResponse(JSON.stringify({message:"Marked as Watched"}),{status:200});
            }
            return new NextResponse(JSON.stringify({err:"Movie not in watchlist"}),{status:404});
        }
        return new NextResponse(JSON.stringify({err:"User not found"}),{status:401});
    } catch (error) {
        return new NextResponse(JSON.stringify({err:"Server Error"}),{status:500});
    }
}

export { handler as POST, update as PATCH }