import React, { Component } from "react";
import { PageInchargeModal, PageInChargeTitleWrapper } from "components";
import { TableErrors } from "./Table";
import { Row, Col } from "antd";
import { ButtonAnt } from "components/patterns";

export default class ErrorList extends Component {
  render() {
    const { data, code, cancel } = this.props;

    return (
      <PageInchargeModal
        centered
        closable={false}
        visible
        width="85%"
        className="modal-ant"
        footer={null}
        // onCancel={onClose}
      >
        <PageInChargeTitleWrapper>Danh sách lỗi</PageInChargeTitleWrapper>

        <TableErrors dataSource={data} code={code} />

        <Row
          type="flex"
          justify="center"
          style={{ margin: "20px 0" }}
        >
          <Col>
            <ButtonAnt onClick={() => cancel()}>Đóng</ButtonAnt>
          </Col>
        </Row>
      </PageInchargeModal>
    );
  }
}
