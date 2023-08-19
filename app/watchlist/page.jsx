'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import MovieCard from '@components/MovieCard';

const WatchList = () => {

  const [ feed,setFeed ]=useState([]);
  const [ mov, setMov ]=useState([]);
  const { data: isUserLoggedIn } = useSession();

  useEffect(()=>{
    if(isUserLoggedIn){
      const option={
        method: 'POST',
        body:JSON.stringify({
          userId:isUserLoggedIn?.user.id
        })
      }
      fetch('/api/watchlist/get', option)
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        const movieData=data.movies;
        const movies=Object.values(movieData).map(movie=>movie.id);
        setMov([...movieData]);
        movies.map(id=>{
            fetch(`/api/getMovie?id=${id}`)
            .then(res => res.json())
            .then(data => {
               setFeed(prev=>[...prev, data.movieData])
               })
            .catch(err => { console.log(err); });
        })
      })
    }
  },[isUserLoggedIn])
  
  return (
    <div>
        <h2 className='head_text text-center'>Watchlist</h2>
        {isUserLoggedIn?<></>: <h3 className='text-center text-red-600 text-3xl m-10'>You aren't logged in </h3> }
        <div className='grid sm:mt-12 sm:grid-cols-4 gap-5 grid-cols-1 mt-28'>
            {feed && Object.values(feed).map((movie) => {
              let bool=false
              Object.values(mov).map(mov=>{
                if(mov.id===movie.id.toString() && mov.watched===true) bool=true;
              })
                return (
                    <MovieCard key={movie.id} props={movie} isList={true} isDisable={bool} />
                )
            })}
        </div>
    </div>

    
  )
}

export default WatchList