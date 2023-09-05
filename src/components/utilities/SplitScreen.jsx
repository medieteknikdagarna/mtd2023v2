import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding-top: 120px;
  gap: 2rem;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Pane = styled.div`
  flex: ${(props) => props.weight};
`;

export const SplitScreen = ({ children, LeftWeight = 1, RightWeight = 1 }) => {
  const [left, right] = children;
  return (
    <Container>
      <Pane weight={LeftWeight}>{left}</Pane>
      <Pane weight={RightWeight}>{right}</Pane>
    </Container>
  );
};
