import styled from "styled-components";
import { motion } from "motion/react";

export const MovieList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 180px);
  justify-content: center;
  place-items: center;
  gap: 24px;
  min-width: 400px;
  max-width: 1000px;
  padding-top: 48px;
  margin: 0 auto;
`;
export const MovieItem = styled(motion.div)`
  overflow: hidden;
  position: relative;
  width: 100%;
  border-radius: 12px;
  cursor: pointer;

  img {
    width: 100%;
  }
`;
