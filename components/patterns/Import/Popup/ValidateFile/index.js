import React from "react";
import { Row, Col, Form, Modal } from "antd";
import { Button } from "components/patterns";
// import { Modal, HeadTab } from "./styles";
import Table from "./Table";
import _isNumber from "lodash/isNumber";
import { withConnect, withAuth } from "hocs";
import {
  PageInchargeModal,
  PageInChargeTitleWrapper,
  PageInchargeContainer,
} from "components";
import { formatToDate } from "utils/helper";
import moment from "moment";
import { ANNOUNCEMENT_TYPE_OPTIONS } from "containers/ManageAnnouncement/const";

const NUMBER_REGEX = /\d+/g;

const initState = {
  dataTable: null
};

@withAuth([], true)
@withConnect((state) => ({
  loading: state.loading.isLoading,
  ...state.authReducer,
}))

class Popup extends React.Component {
  state = initState;

  componentDidMount() {
    const { dataSource } = this.props;
    const { completed, failed, listFails, total } = dataSource;

    const dataTable = listFails.map(item => {
      return {
        ...item,
        dngay: item.dngay ? moment(item.dngay) : '',
        ntao: item.ntao ? formatToDate(item.ntao) : '',
        ngay: item.ngay ? moment(item.ngay) : '',
        tngay: item.tngay ? moment(item.tngay) : '',
        // loai: item?.loai ? ANNOUNCEMENT_TYPE_OPTIONS[item?.loai] : ""
      }
    });

    this.setState({ dataTable })
  }
  
  handleSaving = async (e) => {
    e.preventDefault();
    const { form, onSubmit, onCancel, dispatch, jwt, checkingFixedFileData } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        const result = values.rows?.map((element) => {
          if (_isNumber(element.tsuat)) {
            element.tsuat = element.tsuat / 100;
          }
          return {
            ...element,
          };
        });

        const requestData = { dsNsdhddttbs: result }

        // console.log('result:', result);


        // checkingFixedFileData(result[0], "edit");

        // return ;

        onSubmit(requestData, "edit");

        onCancel();
      }
    });
  };

  confirmCancel = () => {
    const { onCancel } = this.props;
    Modal.confirm({
      centered: true,
      title: "X??c nh???n hu???",
      content: "B???n c?? ch???c ch???n mu???n hu????",
      okText: "X??c nh???n",
      cancelText: "H???y",
      onOk: onCancel,
      // onCancel: this.handleCancelDelete,
    });
  };

  render() {
    const { form, dataSource, entries, rules, title } = this.props;
    const { completed, failed, listFails, total } = dataSource;
    const { dataTable } = this.state;

    // const dataTable = listFails.map(item => {
    //   return {
    //     ...item,
    //     dngay: item.dngay ? moment(item.dngay) : '',
    //     ntao: item.ntao ? formatToDate(item.ntao) : '',
    //     ngay: item.ngay ? moment(item.ngay) : '',
    //     tngay: item.tngay ? moment(item.tngay) : '',
    //     // loai: item?.loai ? ANNOUNCEMENT_TYPE_OPTIONS[item?.loai] : ""
    //   }
    // });

    return (
      <PageInchargeModal
        centered
        visible={true}
        closable={false}
        footer={null}
        onCancel={this.props.onClose}
        // title={title}
        style={{ background: "#fff" }}
        width="80%"
      >
        <PageInChargeTitleWrapper>{title}</PageInChargeTitleWrapper>

        <PageInchargeContainer>
          <div className="file-checking-result" style={{ marginTop: "20px" }}>
            <p>{`T???ng s??? l?????ng b???n ghi t??? file excel: ${total} b???n ghi`}</p>
            <p>{`S??? l?????ng b???n ghi ???? th??m m???i th??nh c??ng: ${completed} b???n ghi`}</p>
            <p>{`S??? l?????ng b???n ghi l???i: ${failed} b???n ghi`}</p>
          </div>

          <Form
            className="cni-popup"
            labelAlign="left"
            colon={false}
            onSubmit={this.onSubmit}
            style={{ background: "#fff", marginTop: "20px" }}
          >
            <Table
              form={form}
              dataSource={dataTable}
              entries={entries}
              rules={rules}
            />
            <Row
              type="flex"
              justify="center"
              gutter={24}
              style={{ marginTop: 20 }}
            >
              <Col>
                <Button 
                  type="primary" 
                  onClick={this.handleSaving}
                >
                  L??u
                </Button>
              </Col>
              <Col>
                <Button type="primary" onClick={this.confirmCancel}>
                  H???y
                </Button>
              </Col>
            </Row>
          </Form>
        </PageInchargeContainer>
      </PageInchargeModal>
    );
  }
}

export default Form.create()(Popup);
