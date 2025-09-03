import styled from 'styled-components';

const AppBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppContainer = styled.div`
  width: 100%;
  max-width: 480px;
  height: 100%;
  max-height: 896px;

  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #282c34;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.8rem;
  font-family: sans-serif;
  text-align: center;
  padding: 0 20px;
  word-break: keep-all;
`;

function App() {
  return (
    <AppBackground>
      <AppContainer>
        <Wrapper>
          <Title>test</Title>
        </Wrapper>
      </AppContainer>
    </AppBackground>
  );
}

export default App;
