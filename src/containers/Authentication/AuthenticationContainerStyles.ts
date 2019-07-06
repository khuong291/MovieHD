import styled from "styled-components";
import { Row, Col } from "antd";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url("https://voxatl.org/wp-content/uploads/2019/03/Screen-Shot-2019-03-14-at-12.26.00-PM.png");
  background-size: 100% 100%;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

export const ModalWrapper = styled(Row)`
  margin: 0 auto;
  width: 800px;
  height: 550px;
  display: inline-block;
  background-color: #fff;
  border: 5px solid #fee;
  border-radius: 10px;
`;

export const LeftCol = styled(Col)`
  height: 100%;
  background-image: url("http://hdqwalls.com/wallpapers/2019-thanos-avengers-endgame-93.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

export const RightCol = styled(Col)``;
