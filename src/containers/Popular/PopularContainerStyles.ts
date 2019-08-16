import styled from "styled-components";
import { Row, Col } from "antd";

export const Container = styled(Row)`
  padding: 30px;
  height: 100vh;
  overflow-y: scroll;

  .ant-table-row {
    background-color: white;
  }
`;

export const ColWrapper = styled(Col)`
  margin-bottom: 16px;

  .CircularProgressbar {
    margin-right: 10px;
    height: 45px;
    width: auto;
  }

  .ant-tag {
    margin-bottom: 5px;
  }

  h4 {
    font-weight: 400;
    font-size: 12px;
    color: gray;
  }
`;

export const CoverWrapper = styled.div`
  position: relative;
  height: 420px;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
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
