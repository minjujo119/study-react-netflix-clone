import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "motion/react";
import { useState } from "react";

// style
const HeaderEl = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 980px;
  min-height: 60px;
  padding: 24px 0;
  margin: 0 auto;
  box-sizing:border-box;
`;
const TabList = styled(motion.nav)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
const TabItem = styled(motion(Link))`
  z-index: 10;
  position: relative;
  display: block;
  font-size: 16px;
  padding: 8px 8px 9px 8px;
  color: rgba(255, 255, 255, 0.5);
  &:hover {
    color: #fff;
  }
`;
const SmoothTab = styled(motion.span)`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: ${(props) => props.theme.pointColor};
`;
const Title = styled.h1`
  font-size: 32px;
  color: ${(props) => props.theme.pointColor};
`;

// content
const linkContent = [
  { path: "/", text: "POPULAR" },
  { path: "/coming-soon", text: "COMING SOON" },
  { path: "/now-playing", text: "NOW PLAYING" },
];

const Header = () => {
  const [selectedTab, setSelectedTab] = useState<string>(
    `${linkContent[0].text}`
  );

  return (
    <HeaderEl>
      <Link to={"/"}>
        <Title>MJflix</Title>
      </Link>
      <TabList>
        {linkContent.map((tab) => {
          return (
            <TabItem
              key={`${tab.text}`}
              to={`${tab.path}`}
              onClick={() => setSelectedTab(`${tab.text}`)}
            >
              {selectedTab === `${tab.text}` ? (
                <>
                  <SmoothTab layoutId="tab" />
                  <span style={{ color: "#fff" }}>{tab.text}</span>
                </>
              ) : (
                <span>{tab.text}</span>
              )}
            </TabItem>
          );
        })}
      </TabList>
    </HeaderEl>
  );
};

export default Header;
