'use client'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react'
import Error from '@components/Error';

const MoviePage = () => {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");
  const { data: isUserLoggedIn } = useSession();
  const [ disable, setDisable ]=useState(false);
  const [data, setData] = useState(false);
  const [provide, setProvide] = useState({});
  const [ error,setError ]=useState(false)
  useEffect(() => {
    if(isUserLoggedIn?.user.movies.find(movie=>movie===movieId)){setDisable(true)}
    fetch(`/api/getMovie?id=${movieId}`)
      .then(res => res.json())
      .then(data => { setData(data.movieData); setProvide(data.providers.flatrate) })
      .catch(err => { console.log(err); });
  }, [isUserLoggedIn])

  //console.log(provide);

  function handleWatchlist(){
    if(!isUserLoggedIn){
      setError("Login for watchlist");
      return;
    } 
    const option={
      method:'POST',
      body:JSON.stringify({
        movieId:movieId,
        userId:isUserLoggedIn?.user.id
      })
    };
    fetch('/api/watchlist/add', option)
    .then(()=>{console.log("Added To WatchList"); setDisable(true)})
    .catch(err=>{setError("Internal Server Error")})
  }



  const baseImageUrl = 'https://image.tmdb.org/t/p/';
  const imageSize = 'w500';
  const imagePath = data.poster_path;
  const imageUrl = `${baseImageUrl}${imageSize}${imagePath}`;
  const rating = (data.vote_average / 2).toFixed(1);
  const genres = data ? Object.values(data.genres).map(genre => genre.name) : [];
  const hour = Math.floor(data.runtime / 60);
  const mins = data.runtime % 60

  //console.log(genres);

  return (
    <>
    {error&&<div className='w-[100%] mb-4'><Error err={error} setError={setError}/></div>}
    <div className='sm:flex sm:flex-cols-2 grid grid-cols-1 gap-5 bg-white rounded-md p-8'>
      <div className='sm:w-[50%] w-[90%]'>
        <img src={imageUrl} alt="Movie Poster" className='w-full rounded shadow-lg mb-3' />
        <div className='flex flex-col gap-2'>
          {provide ? Object.values(provide).map(icon => {
            console.log(icon);
            const logoUrl = `${baseImageUrl}w200${icon.logo_path}`;
            return (<div className='outline_btn p-2'>
              <img src={logoUrl} alt="Streaming Logo" className=' w-8 h-8 me-2 rounded-full' />
              <span className='font-satoshi font-medium'>Watch on {icon.provider_name}</span>
            </div>)
          }) :
            (<div className='outline_btn p-2'>
              <span className='font-satoshi font-medium'>Not Streaming Yet</span>
            </div>
            )
          }
        </div>
      </div>
      <div className="block sm:w-full w-[90%] p-6 border border-gray-200 rounded-lg shadow bg-gray-100 ">
        <div className='sm:flex items-center mb-1 flex-wrap'>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 me-2">{data.title}</h5>
          <p className='text-gray-500 sm:text-xl max-w-2xl text-sm mt-1 font-light'> {genres.map(_ => `${_} `)} | {hour}h {mins}m</p>
        </div>
        <p className=' text-sm ms-1 sm:mb-8 mb-3 font-semibold text-gray-500'>
          {data.release_date}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{rating}</span>
        </p>
        <p className=' text-gray-400 text-base font-semibold mx-1 my-0.5'>Overview</p>
        <p className=" text-lg text-gray-600 font-satoshi">{data.overview}</p>
        {disable? <button className='black_btn mt-10 sm:ms-2 mx-auto'>In Watchlist</button>
        :<button className='black_btn mt-10 sm:ms-2 mx-auto' onClick={handleWatchlist}>{isUserLoggedIn?"Add to Watchlist":"Login For Watchlist"}</button>}
      </div>
    </div>
    </>
  )
}

export default MoviePage