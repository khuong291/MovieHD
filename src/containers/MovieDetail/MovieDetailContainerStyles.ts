import styled from "styled-components";

export const Container = styled.div`
  background-size: cover !important;
  height: 100vh;
`;

export const ContentWrapper = styled.div`
  .CircularProgressbar {
    margin-right: 10px;
    height: 70px;
    width: auto;
  }

  img {
    border-radius: 4px;
    margin-right: 30px;
  }

  h1 {
    font-weight: 600;
    font-size: 40px;
    color: white;
  }

  h2 {
    font-weight: 18;
    font-size: 24px;
    color: white;
  }

  h3 {
    font-weight: 400;
    font-size: 16px;
    color: white;
  }

  span {
    font-size: 30px;
    font-weight: 400;
    color: #a2a2a2;
  }

  .ant-tag {
    color: white;
    background-color: black;
    font-size: 17px;
  }
`;
