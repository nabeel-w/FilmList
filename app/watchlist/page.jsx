'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import MovieCard from '@components/MovieCard';

const WatchList = () => {

  const [ feed,setFeed ]=useState([]);
  const { data: isUserLoggedIn } = useSession();

  useEffect(()=>{
    if(isUserLoggedIn){
        const movies=isUserLoggedIn?.user.movies.map(movie=>movie.id)
        movies.map(id=>{
            fetch(`/api/getMovie?id=${id}`)
            .then(res => res.json())
            .then(data => { setFeed(prev=>[...prev, data.movieData]) })
            .catch(err => { console.log(err); });
        })
    }else redirect('/')
  },[])
  
  return (
    <div>
        <h2 className='head_text text-center'>Watchlist</h2>
        <div className='grid sm:mt-12 sm:grid-cols-4 gap-5 grid-cols-1 mt-28'>
            {feed && Object.values(feed).map((movie) => {
              let bool=false
              isUserLoggedIn?.user.movies.map(mov=>{
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