import React, { Component } from "react";
import UploadForm from "./UploadFile";

export default class ImportForm extends Component {
  render() {
    const { cancel, code, submitFile, getSuccessListImport, templateFileName, toggleReloadPage } = this.props;

    return (
      <UploadForm
        onCancel={cancel}
        submitFile={submitFile}
        code={code}
        getSuccessListImport={getSuccessListImport}
        templateFileName={templateFileName}
        toggleReloadPage={toggleReloadPage}
      />
    );
  }
}
