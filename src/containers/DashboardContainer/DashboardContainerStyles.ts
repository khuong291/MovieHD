import styled from "styled-components";
import { Layout } from "antd";

const { Content } = Layout;

export const AvatarBox = styled.div`
  text-align: center;
  padding: 20px 0;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
  }

  h4 {
    color: white;
    margin-top: 4px;
  }
`;

export const ContentWrapper = styled(Content)`
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url("https://voxatl.org/wp-content/uploads/2019/03/Screen-Shot-2019-03-14-at-12.26.00-PM.png");
`;
