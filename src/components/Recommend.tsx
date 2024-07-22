import styled from "styled-components";

const Recommends = () => {
  return (
    <RecommendsWrapper>
      <Logo>Recommend</Logo>
    </RecommendsWrapper>
  );
};

export default Recommends;

const RecommendsWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2em;
  background-color: #f7f8f9;
  border-radius: 15px;
  padding: 30px 30px;
  box-sizing: border-box;
`;

const Logo = styled.div`
  font-size: 1.5em;
  color: #787878;
  cursor: pointer;
`;
