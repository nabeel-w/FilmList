import Feed from "@components/Feed";

const Home= ()=>{
    return(
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Explore
                <br className="max-md:hidden"/>
                <span className="orange_gradient">Your Favourite Movies</span>
            </h1>
            <p className="desc text-center">
            Discover, track, and enjoy movies with FilmList. Easily create and manage your personalized watchlist,
            explore detailed movie information, and receive daily tailored recommendations for your next movie night 
            </p>
            <Feed />
        </section>
    )
}

export default Home;