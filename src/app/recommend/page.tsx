"use client";
import React, { useEffect, useState, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import Desk from "@/components/Desk";
import Monitor from "@/components/Monitor";
import Keyboard from "@/components/Keyboard";
import Mouse from "@/components/Mouse";

const Recommend = () => {
  const [page, setPage] = useState(0);
  const [isThrottled, setIsThrottled] = useState(false);

  const pages = [
    <Desk key="desk" />,
    <Monitor key="monitor" />,
    <Keyboard key="keyboard" />,
    <Mouse key="mouse" />,
  ];

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (isThrottled) return;
      setIsThrottled(true);

      if (e.deltaY > 0) {
        setPage((prevPage) => Math.min(prevPage + 1, pages.length - 1));
      } else {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
      }

      setTimeout(() => {
        setIsThrottled(false);
      }, 1000); // 1초 동안 스크롤 이벤트를 무시합니다.
    },
    [isThrottled, pages.length]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [handleScroll]);

  return (
    <RecommendWrapper>
      <RecommendContent>
        <Title></Title>
        {pages.map((Component, index) => (
          <AnimatedPage key={index} show={index === page}>
            {Component}
          </AnimatedPage>
        ))}
      </RecommendContent>
    </RecommendWrapper>
  );
};

export default Recommend;

const fadeInUp = keyframes`
  from {
    transform: translateY(5px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeOutDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(50px);
    opacity: 0;
  }
`;

const RecommendWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RecommendContent = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, #d7d2cc 0%, #304352 100%);
  border-radius: 15px;
  padding: 30px;
  color: #787878;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const AnimatedPage = styled.div<{ show: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  position: absolute;
  ${({ show }) =>
    show
      ? css`
          animation: ${fadeInUp} 1s forwards;
        `
      : css`
          animation: ${fadeOutDown} 1s forwards;
        `}
`;
