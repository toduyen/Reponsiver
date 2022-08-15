import { Col, Form, Row } from "antd";
import "moment-timezone";
import React from "react";
import styled from "styled-components";

const TitleWrap = styled.div`
  font-weight: 600;
  padding-right: 3em;
  padding-bottom: 2em;
;`

class ViewDetailTem extends React.Component {

  render() {
    return (
      <Form labelAlign="left" onSubmit={this.onSubmit}>
        <Row gutter={46} align="bottom">
          <Col span={12}>
            <Row gutter={24}>
              <Col span={6}> <TitleWrap>Tên phiếu xuất:</TitleWrap></Col>
              <Col span={18}> <div>Phiếu xuất tem thuốc lá</div></Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={24}>
              <Col span={6}><TitleWrap>Người xuất:</TitleWrap></Col>
              <Col span={18}><div>Nguyễn Thị An</div></Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={24}>
              <Col span={6}> <TitleWrap>Tên DN:</TitleWrap></Col>
              <Col span={18}><div>Công ty TNHH Một thành viên Thuốc lá Thăng Long</div></Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={24}>
              <Col span={6}><TitleWrap>Ngày xuất phiếu:</TitleWrap></Col>
              <Col span={18}><div>01/07/2022</div></Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={24}>
              <Col span={6}> <TitleWrap>Mã số thuế DN:</TitleWrap></Col>
              <Col span={18}><div>0100100054</div></Col>
            </Row>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(ViewDetailTem);
