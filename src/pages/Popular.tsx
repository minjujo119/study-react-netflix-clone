import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AnimatePresence } from "motion/react";
import { getPopular, makePosterPath } from "../data/api";
import { IMovies } from "../data/movieList.interfaces";
import { MovieList, MovieItem } from "../data/movieList.style";
import { fadeInVariants } from "../data/movieList.motion";
import MovieDetail from "../components/MovieDetail";

const Popular = () => {
  const { isLoading, data } = useQuery<IMovies>(["Popular"], getPopular);
  const [movieID, setMovieID] = useState<number | null>(null);
  const [isModal, setIsModal] = useState(false);

  // 모달창 띄울 때 바디 스크롤 막기
  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModal]);

  return (
    <>
      {!isLoading && (
        <MovieList>
          {data?.results.map((movie, index) => (
            <MovieItem
              key={movie.id}
              variants={fadeInVariants}
              initial="initial"
              animate="animate"
              custom={index}
              layoutId={`${movie.id}`}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                setIsModal(true);
                setMovieID(movie.id);
              }}
            >
              <img src={`${makePosterPath(movie.poster_path)}`} />
            </MovieItem>
          ))}
        </MovieList>
      )}
      <AnimatePresence>
        {movieID && (
          <MovieDetail
            movieID={movieID}
            setMovieID={setMovieID}
            setIsModal={setIsModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Popular;
