import styled from "styled-components";
import { Row, Col } from "antd";

export const Container = styled(Row)`
  padding: 30px;
  height: 100vh;
  overflow-y: scroll;
`;

export const ColWrapper = styled(Col)`
  margin-bottom: 16px;
`;

export const CoverWrapper = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 420px;
    vertical-align: top;
  }
  :after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }
  :hover:after {
    opacity: 1;
  }
`;
