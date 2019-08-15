import * as React from "react";
import { AvatarBox } from "../DashboardContainerStyles";
import { User } from "src/apis/auth";

type Props = {
  user?: User;
  collapsed: boolean;
};

const Avatar: React.SFC<Props> = props => (
  <AvatarBox>
    <img src="https://hairstyles.thehairstyler.com/hairstyle_views/front_view_images/10536/original/Chris-Evans.jpg" />
    {!props.collapsed && <h4>{props.user && props.user.name}</h4>}
  </AvatarBox>
);

export default Avatar;
