import styled from "styled-components";
import { motion } from "motion/react";
import { makeBgPath, getMovie } from "../data/api";
import { useQuery } from "react-query";

//interface
interface IDetail {
  adult: false;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: [];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: [];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [];
  production_countries: [];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [];
  status: string;
  tagline: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}
interface IProps {
  movieID: number | null;
  setMovieID: React.Dispatch<React.SetStateAction<number | null>>;
}
// styles
const Dimmed = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const DetailBox = styled(motion.div)`
  position: relative;
  overflow-y: auto;
  width: 80vw;
  height: 80vh;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 12px;
  color: white;
  background-size: 100% auto;
  background-repeat: no-repeat;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    mask-image: linear-gradient(rgba(0, 0, 0, 1) 50%, transparent);
  }
`;
const DetailInfo = styled.div`
  position: relative;
  height: 100%;
  padding: 50% 24px 36px 24px;
  box-sizing: border-box;

  h2 {
    font-weight: 900;
    font-size: 48px;
    color: ${(props) => props.theme.txtColor};
  }

  h2 + p {
    margin-top: 12px;
  }
  dl {
    margin-top:36px;
    dt {
      display: block;
      margin-top: 12px;
      font-weight: 700;
    }
    dd {
      display: block;
      margin-top: 8px;
    }
  }
`;
const ExitBtn = styled(motion.button)`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 36px;
  height: 36px;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 100%;
  background-color: ${(props) => props.theme.bgColorOpacity40};
  color: ${(props) => props.theme.txtColor};
`;
// motions
const modalMotion = {
  initial: { opacity: 0, backdropFilter: "blur(0px)" },
  animate: { opacity: 1, backdropFilter: "blur(30px)" },
  exit: { opacity: 0, backdropFilter: "blur(0px)" },
};

const MovieDetail = ({ movieID, setMovieID }: IProps) => {
  const { isLoading, data } = useQuery<IDetail>(["MovieDetail", movieID], () =>
    getMovie(movieID)
  );

  return (
    <Dimmed
      variants={modalMotion}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      {!isLoading && (
        <DetailBox layoutId={`${movieID}`}>
          <img src={`${makeBgPath(`${data?.backdrop_path}`)}`} alt="" />
          <DetailInfo>
            <h2>{data?.title}</h2>
            <p>{data?.overview}</p>
            <dl>
              <dt>Release date</dt>
              <dd>{data?.release_date}</dd>
              <dt>Popularity</dt>
              <dd>{data?.popularity}</dd>
            </dl>
          </DetailInfo>
          <ExitBtn onClick={() => setMovieID(null)} whileHover={{ scale: 1.1 }}>
            <svg fill="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              ></path>
            </svg>
          </ExitBtn>
        </DetailBox>
      )}
    </Dimmed>
  );
};

export default MovieDetail;
