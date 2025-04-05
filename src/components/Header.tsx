import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderEl = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 60px;
  padding: 24px 0;
`;
const Menu = styled.nav`
  margin-top: 12px;
  a {
    color: ${(props) => props.theme.txtColor};
    padding: 8px;
  }
`;
const Title = styled.h1`
  font-size: 32px;
  color: ${(props) => props.theme.pointColor};
`;

const Header = () => {
  return (
    <HeaderEl>
      <Link to={"/"}>
        <Title>MJflix</Title>
      </Link>
      <Menu>
        <Link to={"/"}>POPULAR</Link>
        <Link to={"/coming-soon"}>COMING SOON</Link>
        <Link to={"/now-playing"}>NOW PLAYING</Link>
      </Menu>
    </HeaderEl>
  );
};

export default Header;
