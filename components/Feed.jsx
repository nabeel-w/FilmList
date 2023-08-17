'use client'

import { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';

const Feed = () => {
    const [feed, setFeed] = useState([]);
    const [ search, setSearch ]=useState("");
    const [ results, setResults ]=useState([]);
    const targetRef = useRef(null);

    const handleSearch=async(e)=>{
        setSearch(e.target.value);
        if(search.length<2){
            setResults([]);
             return;
        }
        fetch(`/api/search?name=${search}`)
        .then(res=>res.json())
        .then(data=>setResults([...data.results]))
        .catch(err=>{console.log(err)})

    }

    const scrollToTarget = () => {
        const yOffset = targetRef.current.getBoundingClientRect().top + window.pageYOffset-15;
        window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }

    useEffect(() => {
        fetch('/api/getFeed')
        .then(res=>res.json())
        .then(data=> setFeed([...data.results]))
        .catch(err=>{console.log(err)})
    }, []);

    return (
        <>
        <div className='w-full flex-center flex-col p-5 mt-3 sm:mb-0 mb-3'>
            <input type="text" className='search_input' placeholder='Search Movie' value={search} onChange={handleSearch} ref={targetRef} onFocus={scrollToTarget} />
        </div>
        <h2 className=' text-3xl font-satoshi font-semibold mt-4 sm:mb-2 mb-4'>{results.length?"Search Results":"Popular"}</h2>
        {results.length?
        <div className='grid sm:mt-12 sm:grid-cols-4 gap-5 grid-cols-1'>
            {results && Object.values(results).map((movie) => {
                return (
                    <MovieCard key={movie.id} props={movie} isList={false} />
                )
            })}
        </div>:
        <div className='grid sm:mt-12 sm:grid-cols-4 gap-5 grid-cols-1'>
            {feed && Object.values(feed).map((movie) => {
                return (
                    <MovieCard key={movie.id} props={movie} isList={false} />
                )
            })}
        </div>
        }
        </>
    )
}

export default Feed;