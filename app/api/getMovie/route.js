import { NextResponse } from "next/server";
const handler=async(req)=>{

    const { searchParams } = new URL(req.url)
    const movieId = searchParams.get('id')
    const url=`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    const url2 = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_TOKEN}`
        }
    };
    try {
        const apiData= await fetch(url, options);
        const providerData= await fetch(url2, options);
        const data = await apiData.json();
        const providers= await providerData.json();
        return NextResponse.json({ movieData:data, providers:providers.results.IN });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({err:"Server Error"}),{status:500});
    }

}

export {handler as GET};