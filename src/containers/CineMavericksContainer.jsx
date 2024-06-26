import { useEffect, useState } from "react";
import { Navigate, RouterProvider, createBrowserRouter, useNavigate} from "react-router-dom";
import Navigation from "../components/Navigation";
import Cinema from "../components/Cinema";
import Movies from "../components/Movies";
import Movie from "../components/Movie"; 
import UserList from "../components/UserList";
import MovieListList from "../components/MovieListList";

const CineMavericksContainer = () => {
    
    const [movies, setMovies] = useState([]);
    const [movieLists, setMovieLists] = useState([]);
    const [highestRatedMovies, setHighestRatedMovies] = useState([]);
    const [users, setUsers] = useState([]);
    
    const fetchMovies = async () => {
        const response = await fetch("http://localhost:8080/movies");
        const data = await response.json();
        setMovies(data);
    };

    const fetchMovieLists = async () => {
        const response = await fetch("http://localhost:8080/movielists");
        const data = await response.json();
        setMovieLists(data);
    };

    const fetchHighestRatedMovies = async () => {
        const response = await fetch("http://localhost:8080/movies");
        const data = await response.json();
        const sortedData = data.sort((movie1, movie2) => {
            return movie2.averageRating - movie1.averageRating;
        })
        setHighestRatedMovies(sortedData.slice(0,5));
    };

    const fetchUsers = async () => {
        const response = await fetch("http://localhost:8080/users");
        const data = await response.json();
        setUsers(data);
    }

    const postReview = async (newReview) => {
        const response = await fetch("http://localhost:8080/reviews", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newReview)
        });
        fetchMovies();
    }

    const deleteReview = async (reviewId) => {
        const response = await fetch(`http://localhost:8080/reviews/${reviewId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(reviewId)
        });
        fetchMovies();
    }

    const editReview = async (amendedReview, reviewId) => {
        const response = await fetch(`http://localhost:8080/reviews/${reviewId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(amendedReview)
        });
        fetchMovies();
    }

    const movieLoader = ({params}) => {
        return movies.find(movie => {
            return movie.id === parseInt(params.movieId);
        });
    };
    
    const cineMaverickRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Navigation />,
            children: [
                {
                    path: "/",
                    element: <Navigate to="/cinema" />
                },
                {
                    path: "/cinema",
                    element: <Cinema 
                        movies={movies}
                        highestRatedMovies={highestRatedMovies}
                        movieLists={movieLists}
                    />
                },
                {
                    path: "/login",
                    element: <UserList users={users} />
                },
                {                  
                    path: "/user/:userId/cinema", 
                    element: <Cinema 
                        movies={movies}
                        highestRatedMovies={highestRatedMovies}
                        movieLists={movieLists}
                    />
                },                 
                {
                    path: "/movies",
                    element: <Movies 
                        movies={movies}
                    />
                },
                {
                    path: "/user/:userId/movies",
                    element: <Movies 
                        movies={movies}
                    />
                },
                {
                    path: "/movies/:movieId",
                    loader: movieLoader,
                    element: <Movie 
                        postReview={postReview}
                        deleteReview={deleteReview}
                        editReview={editReview}
                    />
                },
                {
                    path: "/user/:userId/movies/:movieId",
                    loader: movieLoader,
                    element: <Movie 
                        postReview={postReview}
                        deleteReview={deleteReview}
                        editReview={editReview}
                    />
                },
                {
                    path: "/public_movielists",
                    element: <MovieListList 
                        movieLists={movieLists}
                    />
                },
                {
                    path: "/user/:userId/movielists",
                    element: <MovieListList 
                        movieLists={movieLists}
                    />
                },
                {
                    path: "/user/:userId/public_movielists",
                    element: <MovieListList 
                    movieLists={movieLists}
                />
                }             
            ]
        }
    ]);


    useEffect(() => {
        fetchMovies();
        fetchMovieLists();
        fetchHighestRatedMovies();
        fetchUsers();
    }, []);

    return (  
        <>
            <section>
                <RouterProvider 
                router={cineMaverickRoutes}
                />
           </section>
        </>
    );
}
 
export default CineMavericksContainer;