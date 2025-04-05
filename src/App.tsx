import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";

const Wrap = styled.div`
  min-height: 100vh;
  padding: 0 24px 60px 24px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.txtColor};
`;

function App() {
  return (
    <Wrap>
      <Header />
      <Outlet />
    </Wrap>
  );
}

export default App;
