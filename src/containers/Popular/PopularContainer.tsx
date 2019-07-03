import * as React from "react";
import { Row, Col, Card } from "antd";
import { getPopular } from "../../apis/movies";

type Props = {};

type State = {
  page: number;
};

class PopularContainer extends React.Component<Props, State> {
  state = {
    page: 1
  };

  componentDidMount() {
    getPopular(this.state.page);
  }

  renderLoading = () => {
    return [1, 2, 3, 4].map((_, index: number) => (
      <Col span={6} key={index}>
        <Card style={{ height: 400 }} loading={true} />
      </Col>
    ));
  };
  render() {
    return <Row gutter={16}>{this.renderLoading()}</Row>;
  }
}

export default PopularContainer;
