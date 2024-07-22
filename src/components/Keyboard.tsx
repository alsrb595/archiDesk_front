import styled from "styled-components";

const Keyboard = () => {
  return (
    <KeyboardWrapper>
      <Logo>Keyboard</Logo>
    </KeyboardWrapper>
  );
};

export default Keyboard;

const KeyboardWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2em;
  background-color: #f7f8f9;
  border-radius: 15px;
  padding: 30px;
  box-sizing: border-box;
`;

const Logo = styled.div`
  font-size: 1.5em;
  color: #787878;
  cursor: pointer;
`;
