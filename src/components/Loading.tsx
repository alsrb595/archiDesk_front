import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingWrapper>
      <ImageWrapper>
        <img src="/assets/loading.gif" alt="Loading animation" />
      </ImageWrapper>
    </LoadingWrapper>
  );
};

export default Loading;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box; /* padding을 포함한 크기를 계산 */
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    min-width: 200px; /* 최대 너비 설정 */
    height: auto; /* 비율에 맞게 높이 조정 */
    object-fit: cover; /* 이미지가 Wrapper를 채우도록 설정 */
  }
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #333;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
