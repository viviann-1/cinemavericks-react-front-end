import { useState } from "react";

const CineMavericksContainer = () => {
    
    const [movies, setMovies] = useState([]);
    const [movieLists, setMovieLists] = useState([]);
    const [highestRatedMovies, setHighestRatedMovies] = useState([]);
    
    const fetchMovies = async () => {
        const response = await fetch("localhost:8080/movies");
        const data = await response.json();
        setMovies(data);
    };

    const fetchMovieLists = async () => {
        const response = await fetch("localhost:8080/movielists");
        const data = await response.json();
        setMovieLists(data);
    };

    const fetchHighestRatedMovies = async () => {
        const response = await fetch("");
        const data = await response.json();
        setHighestRatedMovies(data);
    };
    
    return (  
        <>

        </>
    );
}
 
export default CineMavericksContainer;