import {useEffect, useState} from "react"
import './App.css'
import axios from 'axios'
import Movie from "./components/Movie"
import Navbar from "./components/navbar"
import {Route , Routes, Link} from "react-router-dom"
import Home from "./pages/Home"
import LastRelease from "./pages/LastRelease"
import Popular from "./pages/Popular"
import TopRated from "./pages/TopRated"
import Upcoming from "./pages/Upcoming"


function App() {
    
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const NEW_API = MOVIE_API + "/movie/latest"
    const API_KEY = "51b1543a57a27865f2f60cf2eae1359d"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

    const [playing, setPlaying] = useState(false)
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({title: "Loading Movies"})

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }

        const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })

        console.log(data.results[0])
        setMovies(data.results)
        setMovie(data.results[0])

        if (data.results.length) {
            await fetchMovie(data.results[0].id)
        }
    }

    const fetchMovie = async (id) => {
        const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
            params: {
                api_key: API_KEY,
            }
        })

        setMovie(data)
    }


    const selectMovie = (movie) => {
        fetchMovie(movie.id)
        setMovie(movie)
        window.scrollTo(0, 0)
    }

    const renderMovies = () => (
        movies.map(movie => (
            <Movie
                selectMovie={selectMovie}
                key={movie.id}
                movie={movie}
            />
        ))
    )
   
    return (
        <div className="App">
            <header className="center-max-size header">
                <Link to="/" className="site-title">Site Name</Link>
                <form className="form" onSubmit={fetchMovies}>
                    <input className="search" type="text" id="search" placeholder="Search"
                           onInput={(event) => setSearchKey(event.target.value)}/>
                    <button className="submit-search" type="submit"><i className="fa fa-search"></i></button>
                </form>
                <Navbar/>
            </header>
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="lastRelease" element={<LastRelease/>}/>
                    <Route path="popular" element={<Popular/>}/>
                    <Route path="topRated" element={<TopRated/>}/>
                    <Route path="upcoming" element={<Upcoming/>}/>
                </Routes>
                {movies.length ?
                    <main>
                        {movie ?
                            <div className="poster"
                                style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
                                {playing ?
                                    <>
                                    </> :
                                    <div className="center-max-size">
                                        <div className="poster-content">
                                            <h1>{movie.title}</h1>
                                            <p>{movie.overview}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                            : null}

                        <div className={"center-max-size container"}>
                            {renderMovies()}
                        </div>
                    </main>
                    : 'Sorry, no movies found'}
            </div>
        </div>
    );

    
}

export default App;
