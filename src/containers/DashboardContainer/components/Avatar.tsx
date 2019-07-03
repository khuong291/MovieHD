import * as React from "react";
import { AvatarBox } from "../DashboardContainerStyles";

type Props = {
  collapsed: boolean;
};

const Avatar: React.SFC<Props> = props => (
  <AvatarBox>
    <img src="https://hairstyles.thehairstyler.com/hairstyle_views/front_view_images/10536/original/Chris-Evans.jpg" />
    {!props.collapsed && <h4>Chris Evans</h4>}
  </AvatarBox>
);

export default Avatar;
