import React from "react";
import readXlsxFile from "read-excel-file";
import notification from "utils/notification";
import UploadFile from "./Popup/UploadFile";
import ValidateFile from "./Popup/ValidateFile";
import { NoBorderButton } from "./styles";
import { Tooltip } from "antd";
import { withConnect } from "hocs";
import _isEmpty from "lodash/isEmpty";
import { ImportButton } from 'components/patterns';

const initState = {
  visibleUploadFilePopup: false,
  visibleValidateFilePopup: false,
  dataSource: [],
  emptyFile: false
};

@withConnect((state) => ({
  jwt: state.authReducer.jwt,
  // isLoading: state.layoutReducer.isLoading,
}))
class Import extends React.PureComponent {
  state = initState;

  handleUpload = async (file) => {
    const { importFileRequest = () => { } } = this.props;

    if (
      !file.type ||
      ![
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type)
    )
      return notification.error("Định dạng file không hợp lệ");

    if (file.size > 5 * 1024 * 1024) {
      return notification.error("Dung lượng file vượt quá 5MB");
    }

    const { dispatch, jwt, onSubmit } = this.props;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await dispatch(importFileRequest(formData, jwt));
      const { listFails, listSuccess, total } = response;

      if (total <= 0) this.setState({ emptyFile: true })

      else {
        if (listFails?.length > 0) {
          this.setState({
            dataSource: response,
            visibleUploadFilePopup: false,
            visibleValidateFilePopup: true,
            emptyFile: false
          });
        }

        else {
          this.setState({
            visibleUploadFilePopup: false,
            emptyFile: false
          }, () => {
            const requestData = { dsNsdhddttbs: listSuccess }

            // onSubmit(requestData);
          });
        }
      }
      } catch (error) {
        console.log(error)
      }
  };

  togglePopup = (type) => (visible) => () => {
    this.setState({ [`visible${type}Popup`]: visible });
  };

  render() {
    const {
      title,
      rules,
      onSubmit = () => { },
      map,
      templateFileName,
      isLoading,
      checkingFixedFileData
    } = this.props;

    const {
      visibleUploadFilePopup,
      visibleValidateFilePopup,
      dataSource,
      emptyFile
    } = this.state;
    return (
      <React.Fragment>
        {visibleUploadFilePopup && (
          <UploadFile
            onSubmit={this.handleUpload}
            onCancel={this.togglePopup("UploadFile")(false)}
            title={title}
            templateFileName={templateFileName}
            emptyFile={emptyFile}
          />
        )}
        {visibleValidateFilePopup && (
          <ValidateFile
            dataSource={dataSource}
            onSubmit={onSubmit}
            onCancel={this.togglePopup("ValidateFile")(false)}
            entries={Object.entries(map)}
            rules={rules}
            title={title}
            checkingFixedFileData={checkingFixedFileData}
          />
        )}
        <Tooltip title={"Nhập từ file"}>
          <ImportButton
            onClick={this.togglePopup("UploadFile")(true)}
            loading={isLoading}
          />
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default Import;
