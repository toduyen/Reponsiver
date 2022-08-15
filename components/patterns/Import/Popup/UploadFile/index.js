import React from "react";
import { Row, Col, Form, Upload } from "antd";
import { withConnect } from "hocs";
import { Modal, HeadTab, DataItem } from "./styles";
import { BorderBottomInput, Button } from "components/patterns";
@withConnect((state) => ({ ...state.authReducer }))
class Popup extends React.Component {
  state = { file: null };
  onSubmitPopup = (e) => {
    e.preventDefault();

    const { onSubmit = () => { } } = this.props;
    const { file } = this.state;
    onSubmit(file);
  };
  render() {
    const {
      title,
      form: { getFieldDecorator },
      onCancel,
      templateFileName,
      emptyFile
    } = this.props;
    const { file } = this.state;
    const props = {
      beforeUpload: (file) => {
        console.log(file)
        this.setState({ file });
        return false;
      },
      showUploadList: false,
    };
    const fileList = file ? [file] : [];
    return (
      <Modal
        visible={true}
        closable={false}
        footer={null}
        onCancel={this.props.onClose}
        title="Tải file"
      >
        <Form
          className="cni-popup"
          labelAlign="left"
          colon={false}
          onSubmit={this.onSubmitPopup}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Button
                type="primary"
                href={`/static/template/${templateFileName}`}
              >
                Tải file mẫu
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DataItem
                label="File"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <Row justify="end" type="flex">
                  <Col span={18}>                  
                      <BorderBottomInput disabled value={file?.name || ""} />
                  </Col>
                  <Col span={6}>
                    <Upload {...props} fileList={fileList}>
                      <Button type="primary">Chọn</Button>
                    </Upload>
                  </Col>
                </Row>
              </DataItem>
            </Col>
          </Row>
          <Row style={{ marginTop: '5px' }}>
            <Col offset={6}>
              {emptyFile ? <span style={{ color: 'red' }}>{"File bạn tải đang rỗng, hãy kiểm tra lại"}</span> : ''}
            </Col>
          </Row>
          <Row
            type="flex"
            justify="center"
            gutter={24}
            style={{ marginTop: 20 }}
          >
            <Col>
              <Button type="primary" disabled={!file} htmlType="submit">
                Tải lên
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={onCancel}>Hủy</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(Popup);
