import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row, Space, Spin } from "antd";
import Logo from "../logo/Logo";
import s from "./LoadingView.module.scss";

const LoadingView = () => {
  return (
    <Row className={s.container} align="middle" justify="center">
      <Space align="center" direction="vertical" wrap>
        <Col>
          <Logo link={false} />
        </Col>
        <Col>
          <Spin
            indicator={
              <LoadingOutlined style={{ fontSize: 40, color: "#000" }} spin />
            }
          />
        </Col>
      </Space>
    </Row>
  );
};

export default LoadingView;
