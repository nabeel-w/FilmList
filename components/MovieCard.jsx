import Link from "next/link";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Image from 'next/image'

const genre = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

const MovieCard = ({ props, isList, isDisable=false }) => {
  const [genreNames, setGenreNames] = useState({});
  const [ disable, setDisable ] =useState(isDisable);
  const { data: isUserLoggedIn } = useSession();
  const baseImageUrl = 'https://image.tmdb.org/t/p/';
  const imageSize = 'w500';
  const link = `/movies/?id=${props.id}`
  const imagePath = `${baseImageUrl}${imageSize}${props.poster_path}`;
  const date=props.release_date.split('-');
  function getGenreNameById(genreId) {
    const genreFound = genre.find((item) => item.id === genreId);
    return genreFound ? genreFound.name : '';
  }
  useEffect(()=>{
    if(isList){
      const names=props.genres.map(genre=>genre.name);
      setGenreNames([...names]);
    }else{
      const genreIds = props.genre_ids;
      const names=genreIds.map((genreId) => getGenreNameById(genreId))
      setGenreNames([...names]);
    }
  },[])
  const rating= (props.vote_average/2).toFixed(1);
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  const handleComplete=(e)=>{
    e.preventDefault();
    console.log("Complete Called from ", props.id);
    const option={
      method: 'PATCH',
      body:JSON.stringify({
        movieId:props.id,
        userId:isUserLoggedIn?.user.id
      })
    }
    fetch('/api/watchlist/add', option)
    .then(()=>{console.log("Marked as Watched"); setDisable(true);})
    .catch(err=>{console.log("Internal Server Error")})
  }

  return (
    <Link href={link}>
      <div className={disable?"max-w-sm rounded overflow-hidden shadow-lg opacity-50":"max-w-sm rounded overflow-hidden shadow-lg"} >
        <Image className="w-full" width={500} height={500} loading="lazy" src={imagePath} alt="Movie Poster" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{props.title}</div>
          <p className=' text-sm ms-1 font-semibold text-gray-500'>{date[0]}</p>
        </div>
        <div className="flex items-center mt-2.5 mb-5 ms-6">
          {stars.map(star=>{
              if(star<=Math.floor(rating)) return(
                <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
              )
              else return(
                <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
              )
          }
            
            )}
            
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{rating}</span>
            {isList&&<button className={disable?"green_btn ms-3 me-2":"black_btn ms-3 me-2"} onClick={!disable && handleComplete}><CheckCircleOutlineIcon /></button>}
        </div>
        <div className="px-6 pt-4 pb-2 ">
          {Object.values(genreNames).map(genre => <span key={genre} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{genre}</span>)}
        </div>
      </div>
    </Link>

  )
}

export default MovieCard