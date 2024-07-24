"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface ProductRecommendation {
  name: string;
  pros: string[];
  cons: string[];
}

const Keyboard = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [job, setJob] = useState("");
  const [geminiKeyboards, setGeminiKeyboards] = useState<
    ProductRecommendation[]
  >([]);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  useEffect(() => {
    const jobFromStorage = localStorage.getItem("job");
    if (jobFromStorage) {
      setJob(jobFromStorage);
    }
  }, []);

  const fetchGeminiKeybaords = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/gemini?job=${job}&page=keyboard`
      );
      console.log("response", response.data);

      if (Array.isArray(response.data.recommendations)) {
        const formattedRecommendations = response.data.recommendations.map(
          (item: any) => ({
            name: item.name,
            pros: item.pros,
            cons: item.cons,
          })
        );
        setGeminiKeyboards(formattedRecommendations);
        console.log("??", formattedRecommendations);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Gemini keyboard fail", error);
    }
  };

  useEffect(() => {
    if (job) {
      fetchGeminiKeybaords();
    }
  }, [job]);

  const handleCardClick = (keyboardName: string) => {
    console.log("Card clicked:", keyboardName);
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(keyboardName)}`,
      "_blank"
    );
  };

  console.log("keyboard", geminiKeyboards);

  return (
    <KeyboardWrapper>
      {openSidebar && (
        <SidebarOverlay onClick={toggleSidebar}>
          <Sidebar onClick={(e) => e.stopPropagation()}>
            <SidebarContent>
              <CloseButton onClick={toggleSidebar}>&times;</CloseButton>
              <SidebarLink href="/">Home</SidebarLink>
              <SidebarLink href="/boards">Boards</SidebarLink>
              <SidebarLink href="/desk">Desk</SidebarLink>
              <SidebarLink href="/monitor">Monitor</SidebarLink>
              <SidebarLink href="/keyboard">Keyboard</SidebarLink>
              <SidebarLink href="/mouse">Mouse</SidebarLink>
            </SidebarContent>
          </Sidebar>
        </SidebarOverlay>
      )}
      <Header>
        <Logo>Keyboard</Logo>
        <MenuButton onClick={toggleSidebar}>Menu</MenuButton>
      </Header>
      <ItemTopWrapper>
        {geminiKeyboards.map((keyboard, index) => (
          <KeyboardCard
            key={index}
            onClick={() => handleCardClick(keyboard.name)}
          >
            <KeyboardTitle>{keyboard.name}</KeyboardTitle>
            <List>
              <ListTitle>Pros:</ListTitle>
              {keyboard.pros.map((pro, idx) => (
                <ListItem key={idx}>{pro}</ListItem>
              ))}
            </List>
            <List>
              <ListTitle>Cons:</ListTitle>
              {keyboard.cons.map((con, idx) => (
                <ListItem key={idx}>{con}</ListItem>
              ))}
            </List>
          </KeyboardCard>
        ))}
      </ItemTopWrapper>
    </KeyboardWrapper>
  );
};

export default Keyboard;

const KeyboardWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f7f8f9;
  border-radius: 15px;
  padding: 30px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 40px;
  color: #787878;
  cursor: pointer;
  margin-bottom: 30px;
`;

const MenuButton = styled.div`
  font-size: 1.5em;
  color: #b4c8bb;
  cursor: pointer;
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Sidebar = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 250px;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: slideIn 0.3s forwards;

  @keyframes slideIn {
    from {
      right: -250px;
    }
    to {
      right: 0;
    }
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CloseButton = styled.div`
  font-size: 2em;
  align-self: flex-end;
  cursor: pointer;
`;

const SidebarLink = styled.a`
  font-size: 1.2em;
  margin: 10px 0;
  text-decoration: none;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #b4c8bb;
  }
`;

const ItemTopWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 40px;
`;

const KeyboardCard = styled.div`
  border-radius: 10px;
  border: 3px solid #cec9c3;
  padding: 20px;
  width: 300px;
  gap: 10px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const KeyboardTitle = styled.div`
  font-size: 22px;
  margin-bottom: 10px;
  color: #484848;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 10px 0;
`;

const ListTitle = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
  color: #b4c8bb;
`;

const ListItem = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
  color: #81807d;
`;
