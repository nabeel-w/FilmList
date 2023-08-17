import { NextResponse } from "next/server";


const handler=async(req)=>{
    const { searchParams } = new URL(req.url);
    const movieName = searchParams.get('name');

    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_TOKEN}`
        }
    };
    try {
        const searchData= await fetch(url, options);
        const data = await searchData.json();
        const results=data.results;

        return new NextResponse(JSON.stringify({results}), { status:200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({err:"Server Error"}),{status:500});
    }


}

export {handler as GET};