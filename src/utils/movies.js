import axios from "axios";

// const urlMovies = "http://localhost:8000/movies";

const urlMovies = "https://cinema-wxew.onrender.com/movies";

const initialRequest = () => {
  axios.get(`${urlMovies}/start`);
};

const getMovieById = (movieId) => {
  return axios.get(`${urlMovies}/${movieId}`);
};

const getAllMovies = () => {
  return axios.get(urlMovies);
};

const updateMovie = (id, movie) => {
  return axios.put(`${urlMovies}/${id}`, movie);
};

const addMovie = (movie) => {
  return axios.post(urlMovies, movie);
};

const deleteMovie = (movieId) => {
  return axios.delete(`${urlMovies}/${movieId}`);
};

export {
  initialRequest,
  getMovieById,
  getAllMovies,
  updateMovie,
  addMovie,
  deleteMovie,
};
