import styled from "styled-components";

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

export const ModalWrapper = styled.div`
  margin: 0 auto;
  width: 500px;
  height: auto;
  display: inline-block;
  background-color: #fff;
  border: 4px solid #49f;
  border-radius: 4px;
`;
