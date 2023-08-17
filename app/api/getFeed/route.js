import { NextResponse } from "next/server";
const handler=async()=>{
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_TOKEN}`
        }
    };
    try {
        const apiData= await fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-IN', options)
        const data = await apiData.json();

        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({err:"Server Error"}),{status:500});
    }

}

export {handler as GET};