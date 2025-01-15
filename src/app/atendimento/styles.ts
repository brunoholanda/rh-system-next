import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  text-align: center;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;

  .ant-card {
    border-radius: 8px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    width: 180px;
    height: 110px;
    margin: .2rem;
  }
`;
