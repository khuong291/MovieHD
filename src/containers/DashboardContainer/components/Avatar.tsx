import * as React from "react";
import { AvatarBox } from "../DashboardContainerStyles";
import { RootState } from "src/reducers/root";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  user: state.user
});

type StateProps = ReturnType<typeof mapStateToProps>;

type Props = StateProps & {
  collapsed: boolean;
};

const Avatar: React.SFC<Props> = props => (
  <AvatarBox>
    <img src="https://hairstyles.thehairstyler.com/hairstyle_views/front_view_images/10536/original/Chris-Evans.jpg" />
    {!props.collapsed && <h4>{props.user.name}</h4>}
  </AvatarBox>
);

export default connect(mapStateToProps)(Avatar);
