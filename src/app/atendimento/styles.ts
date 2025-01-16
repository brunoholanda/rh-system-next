import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  text-align: center;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    margin: 0 1rem 2rem 1rem;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  .ant-card {
    border-radius: 8px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    width: 170px;
    height: 110px;
    margin: .5rem .3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;  }
`;
