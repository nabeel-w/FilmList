'use client'

import { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import LoadingCard from './LoadingCard';
import { FaSearch } from "react-icons/fa";


const Feed = () => {
    const [feed, setFeed] = useState([]);
    const [ search, setSearch ]=useState('');
    const [ results, setResults ]=useState([]);
    const [Loading, setLoading] = useState(true);
    const [NotFound, setNotFound] = useState(false);
    const targetRef = useRef(null);
    const loadingCards = Array(8).fill().map((_, i) => <LoadingCard key={i} />);

    const handleChange=(e)=>{
        setSearch(e.target.value);
        let input=e.target.value;
        if(input.length<2) setResults([]);
    }

    const onKeyDown=(e)=>{
        if (e.key === 'Enter' && search.length>2) {
            handleSubmit()
        }
        else return;
    }

    const handleSubmit = ()=>{
        setNotFound(false);
        if(search.length<2){
            setResults([]);
            return;
        }
        else{
            setLoading(true)
            fetch(`/api/search?name=${search}`)
            .then(res=>res.json())
            .then(data=>{
                setLoading(false);
                if(data.results.length===0) setNotFound(true)
                setResults([...data.results]);
            })
            .catch(err=>{console.log(err)})
        }
    }

    const scrollToTarget = () => {
        const yOffset = targetRef.current.getBoundingClientRect().top + window.pageYOffset-15;
        window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }

    useEffect(() => {
        setLoading(true)
        fetch('/api/getFeed')
        .then(res=>res.json())
        .then(data=>{
            setFeed([...data.results]);
            setLoading(false);
        })
        .catch(err=>{console.log(err)})
    }, []);

    return (
        <>
        <div className='w-full relative p-5 mt-3 sm:mb-0 mb-3 z-[-10]'>
            <input type="text" className='search_input' placeholder='Search Movie' onChange={handleChange} onKeyDown={onKeyDown} ref={targetRef} onFocus={scrollToTarget} />
            <button className='absolute inset-y-0 right-0 px-10 py-2' onClick={handleSubmit}>
                <FaSearch />
            </button>
        </div>
        <h2 className=' text-3xl font-satoshi font-semibold mt-4 sm:mb-2 mb-4'>{(results.length || search.length!==0 && NotFound)?`Results For: ${search}`:"Popular"}</h2>
        {(results.length===0 && search.length!==0 && NotFound) && 
            <h3 className='text-xl font-satoshi font-semibold mt-4 sm:mb-2 mb-4'>No Results Found: Try Again</h3>
        }
        {results.length?
        <div className='grid sm:mt-12 sm:grid-cols-4 gap-5 grid-cols-1'>
            {results && Object.values(results).map((movie) => {
                return (
                    <MovieCard key={movie.id} props={movie} isList={false} />
                )
            })}
            {Loading && loadingCards}
        </div>:
        <div className='grid sm:mt-12 sm:grid-cols-4 gap-5 grid-cols-1'>
            {feed && Object.values(feed).map((movie) => {
                return (
                    <MovieCard key={movie.id} props={movie} isList={false} />
                )
            })}
            {Loading && loadingCards}
        </div>
        }
        </>
    )
}

export default Feed;