import React from "react";
import { Row, Col, Form, Upload } from "antd";
import { withConnect } from "hocs";
import { Modal, HeadTab, DataItem } from "./styles";
import { BorderBottomInput, Button } from "components/patterns";
import notification from "utils/notification";
import ErrorList from "../ErrorList";
import { layoutToggleLoading } from "actions/layout.action";
@withConnect((state) => ({ ...state.authReducer }))
class UploadForm extends React.Component {
  state = {
    file: null,
    openFailsList: false,
    importInfo: {},
  };

  onSubmitPopup = (e) => {
    const { dispatch } = this.props;

    e.preventDefault();

    dispatch(layoutToggleLoading(true));

    const { file } = this.state;
    this.handleUpload(file);
  };

  handleUpload = async (file) => {
    const {
      handleImportFile,
      submitFile,
      jwt,
      dispatch,
      onCancel,
      getSuccessListImport,
      code,
      toggleReloadPage
    } = this.props;

    // Validate file

    if (
      !file.type ||
      ![
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type)
    ){
      dispatch(layoutToggleLoading(false));
      return notification.error("Định dạng file không hợp lệ");
    }

    if (file.size > 5 * 1024 * 1024) {
      dispatch(layoutToggleLoading(false));
      return notification.error("Dung lượng file vượt quá 5MB");
    }

    const formData = new FormData();
    formData.append("file", file);

    // Call API import:
    const response = await dispatch(submitFile(formData, jwt));

    try {
      if (response) {
        this.setState({ importInfo: response?.data }, () => {
          if (this.state.importInfo?.listFails?.length > 0) {
            this.setState({ openFailsList: true });
          } else {
            if (this.state.importInfo?.listSuccess?.length > 0) {
              getSuccessListImport(this.state.importInfo?.listSuccess);
              notification.success("Import file thành công");
              onCancel();
            }

            if ((['DNBTH', 'DSDNCM'].includes(code)) && (response?.status === 200)) {
              notification.success("Import file thành công");
              if(toggleReloadPage) toggleReloadPage(true);
              onCancel();
            }
          }
        });
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(layoutToggleLoading(false));
    }
  };

  renderImportFailsList = () => {
    const { openFailsList, importInfo } = this.state;
    const { code } = this.props;

    if (openFailsList) {
      return (
        <ErrorList
          data={importInfo?.listFails}
          code={code}
          cancel={() => this.setState({ openFailsList: false })}
        />
      );
    }

    return;
  };

  render() {
    const {
      title,
      form: { getFieldDecorator },
      onCancel,
      templateFileName,
      emptyFile,
    } = this.props;
    const { file } = this.state;
    const props = {
      beforeUpload: (file) => {
        this.setState({ file });
        return false;
      },
      showUploadList: false,
    };
    const fileList = file ? [file] : [];
    return (
      <>
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
            <Row style={{ marginTop: "5px" }}>
              <Col offset={6}>
                {emptyFile ? (
                  <span style={{ color: "red" }}>
                    {"File bạn tải đang rỗng, hãy kiểm tra lại"}
                  </span>
                ) : (
                  ""
                )}
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
                <Button type="primary" onClick={onCancel}>
                  Hủy
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
        {this.renderImportFailsList()}
      </>
    );
  }
}

export default Form.create()(UploadForm);
