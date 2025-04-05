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
z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding-top: 48px;
`;
const DetailBox = styled(motion.div)`
  position: relative;
  overflow-x: hidden;
  width: 80vw;
  min-height: 80vh;
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
    font-size: 14px;
    margin-top: 12px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    margin-top: 24px;

    h3 {
      font-size: 14px;
    }
    h3 + span {
      font-size: 14px;
      margin-top: 12px;
    }
  }
`;
const ExitBtn = styled(motion.button)`
  position: absolute;
  top: 12px;
  right: 12px;
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
  const formattedBudget = data?.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedRuntime = data && `${Math.floor(data.runtime / 60)}hr ${data.runtime % 60}min`
  
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
            <ul>
              <li>
                <h3>Release date</h3>
                <span>{data?.release_date}</span>
              </li>
              <li>
                <h3>Popularity</h3>
                <span>{data?.popularity}</span>
              </li>
              <li>
                <h3>Budget</h3>
                <span>{`$${formattedBudget}`}</span>
              </li>
              <li>
                <h3>Runtime</h3>
                <span>{formattedRuntime}</span>
              </li>
            </ul>
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
