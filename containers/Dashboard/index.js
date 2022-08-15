import React from "react";
import TopLeft from "./TopLeft";
import TopRight from "./TopRight";
import BottomLeft from "./BottomLeft";
import BottomRight from "./BottomRight";
import BottomCenter from "./BottomCenter";
import { Row, Col } from "antd";
import { PageTitleWrapper } from "components";
import { DashboardWrapper } from "./styles/test";
import "./styles/bootstrap.min.css";
class Dashboard extends React.Component {
  render() {
    return (
      <DashboardWrapper>
        {/* <div className="main-content">
          <div className="container-fluid">
            <div className="add-new-content-box">
              <div className="main-chart">
                <PageTitleWrapper>Trang chủ</PageTitleWrapper>
                <Row>
                  <Col span={12}>
                    <TopLeft />
                  </Col>
                  <Col span={12}>
                    <TopRight />
                  </Col>
                  <Col span={8}>
                    <BottomLeft />
                  </Col>
                  <Col span={8}>
                    <BottomCenter />
                  </Col>
                  <Col span={8}>
                    <BottomRight />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div> */}
      </DashboardWrapper>
    );
  }
}

export default Dashboard;
