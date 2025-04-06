import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { AnimatePresence } from "motion/react";
import { getNowPlaying, makePosterPath } from "../data/api";
import MovieDetail from "../components/MovieDetail";
import { IMovies } from "../data/movieList.interfaces";
import { fadeInVariants } from "../data/movieList.motion";
import { MovieList, MovieItem } from "../data/movieList.style";

const NowPlaying = () => {
  const { isLoading, data } = useQuery<IMovies>(["NowPlaying"], getNowPlaying);
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
              layoutId={`${movie.id}`}
              variants={fadeInVariants}
              initial="initial"
              animate="animate"
              custom={index}
              whileHover={{ scale: 1.1 }}
              onClick={() => setMovieID(movie.id)}
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

export default NowPlaying;
