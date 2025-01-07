import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  background-color: #f5f5f5;
  overflow: hidden;

  h1 {
    text-align: center;
    margin: 2rem 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    width: 250px;
    height: 250px;
    background: url('/assets/img/bg-left-top.png') no-repeat center center;
    background-size: contain;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    right: -50px;
    top: 50%;
    transform: translateY(-50%);
    width: 200px;
    height: 200px;
    background: url('/assets/img/bg-right-midle.png') no-repeat center center;
    background-size: contain;
    z-index: 0;
  }

  .bg-left-bottom {
    position: absolute;
    bottom: 120px;
    left: -50px;
    width: 200px;
    height: 200px;
    background: url('/assets/img/bg-left-bottom.png') no-repeat center center;
    background-size: contain;
    z-index: 0;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: relative;
  z-index: 1;


  button {
    margin-top: 1rem;
  }
`;

export const ForgotPasswordLink = styled.div`
  text-align: center;
  margin-top: 10px;
  a {
    color: #1890ff;
  }
`;
