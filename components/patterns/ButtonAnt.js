import React from "react";
import styled from "styled-components";
import { Button as AntButton, Tooltip, Icon } from "antd";
import {
  ProcessIconSvg,
  RequestApprovalSvg,
  ApproveAndSignSvg,
  RejectSvg,
  ExportSvg,
  PrintSvg,
  ViewDetail,
  DeleteSvg,
  AddSvg,
  EditSvg,
  ImportSvg,
  CaptchaReloadSvg,
} from "consts/icons/iconsEnable";
import {
  DisableProcessIconSvg,
  DisableRequestApprovalSvg,
  DisableApproveAndSignSvg,
  DisableRejectSvg,
  DisableExportSvg,
  DisablePrintSvg,
  DisableViewDetail,
  DisableDeleteSvg,
  DisableAddSvg,
  DisableEditSvg,
  DisableImportSvg,
} from "consts/icons/iconsDisable";

// const {  } = AntButton;

export const Button = styled(AntButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #915715;
  border: none;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  -webkit-box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  font-family: Arial;
  font-size: 14px;
  :hover {
    color: #fff;
    background-color: #915715;
    // border-color: #40a9ff;
  }
  :focus {
    color: #fff;
    background-color: #915715;
    // border-color: #40a9ff;
  }
  :disabled {
    background-color: #f0f2f5;
    color: black;
  }
`;

export const ButtonAnt = ({ children, text, ...props }) => {
  return (
    <Button {...props}>
      <text>{children || text}</text>
    </Button>
  );
};

export const ButtonRevert = styled(AntButton)`
  :not(.ant-btn-link) {
    border: 0.5px solid #915715;
    background: #f5f5f5;
    :disabled {
      border: 0.5px solid #d9d9d9;
      opacity: 0.5;
    }
  }
  border-radius: 5px;
  // display: inline-flex;
  // align-items: center;
  transition: 0.3s;
  // justify-content: center;
  // width: 50px;
  // height: 35px;
  :hover:not(.ant-btn-link) {
    background: #fff;
    border: 1px solid #915715;
  }
  :focus:not(.ant-btn-link) {
    background: #fff;
    border: 1px solid #915715;
  }
  text {
    color: rgba(0, 0, 0, 0.25);
  }
`;

export const IconButton = styled(AntButton)`
  :not(.ant-btn-link) {
    border: 0.5px solid #915715;
    background: #f5f5f5;
    :disabled {
      border: 0.5px solid #d9d9d9;
      opacity: 0.5;
    }
  }
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  transition: 0.3s;
  justify-content: center;
  width: 31px;
  height: 30px;
  margin-left: 5px;
  margin-right: 5px;
  :hover:not(.ant-btn-link) {
    background: #fff;
    border: 1px solid #915715;
  }
  :focus:not(.ant-btn-link) {
    background: #fff;
    border: 1px solid #915715;
  }
  text {
    color: rgba(0, 0, 0, 0.25);
  }
  .ant-btn-group .ant-btn-link {
    background-color: transparent !important;
    border-color: transparent !important;
  }
  .anticon {
    line-height: 0 !important;
  }
`;

export const ButtonIconCustom = styled(AntButton)`
  background: #f5f5f5;
  border-radius: 5px;
  align-items: center;
  display: grid;
  transition: 0.3s;
  justify-content: center;
  width: 31px;
  height: 30px;
  margin-left: 5px;
  margin-right: 5px;
  border: 0.5px solid #915715;

  :hover {
    background: #fff;
    border: 0.5px solid #915715;
  }
  :focus {
    background: #fff;
    border: 0.5px solid #915715;
  }
  text {
    color: rgba(0, 0, 0, 0.25);
  }
  .imgSvg[disabled] {
    opacity: 0.6;
  }
`;

// .imgSvg:hover {
//   opacity: 0.5;
// }

export const ButtonIcon = ({
  title,
  icon,
  size = "18px",
  placement = "top",
  ...props
}) => {
  const statusUrl = props.disabled ? "icon_disable" : "icon_active";
  const url = `../../static/images/${statusUrl}/${icon}.svg`;
  return (
    <Tooltip placement={placement} title={title}>
      <ButtonIconCustom className="btnCust" {...props}>
        <img
          disabled={props.disabled}
          className="imgSvg"
          style={{ width: size }}
          src={url}
        />
      </ButtonIconCustom>
    </Tooltip>
  );
};

export const ProcessButton = ({ text, iconProps, ...props }) => {
  return (
    <ButtonRevert {...props} className="ant-btn-icon-only">
      <text>{text}</text>
      <Icon
        component={props.disabled ? DisableProcessIconSvg : ProcessIconSvg}
        {...iconProps}
      />
    </ButtonRevert>
  );
};

export const RequestApproveButton = ({ text, iconProps, ...props }) => {
  return (
    <ButtonRevert {...props} className="ant-btn-icon-only">
      <text>{text}</text>
      <Icon
        component={
          props.disabled ? DisableRequestApprovalSvg : RequestApprovalSvg
        }
        {...iconProps}
      />
    </ButtonRevert>
  );
};

export const ApproveAndSignButton = ({ text, iconProps, ...props }) => {
  return (
    <ButtonRevert {...props} className="ant-btn-icon-only">
      <text>{text}</text>
      <Icon
        component={
          props.disabled ? DisableApproveAndSignSvg : ApproveAndSignSvg
        }
        {...iconProps}
      />
    </ButtonRevert>
  );
};

export const RejectButton = ({ text, iconProps, ...props }) => {
  return (
    <ButtonRevert {...props} className="ant-btn-icon-only">
      <text>{text}</text>
      <Icon
        component={props.disabled ? DisableRejectSvg : RejectSvg}
        {...iconProps}
      />
    </ButtonRevert>
  );
};

export const ExportButton = ({ text, iconProps, ...props }) => {
  return (
    <ButtonRevert {...props} className="ant-btn-icon-only">
      <text>{text}</text>
      <Icon
        component={props.disabled ? DisableExportSvg : ExportSvg}
        {...iconProps}
      />
    </ButtonRevert>
  );
};

export const PrintButton = ({ text, iconProps, ...props }) => {
  return (
    <ButtonRevert {...props} className="ant-btn-icon-only">
      <text>{text}</text>
      {/* {props.disabled ? <DisablePrintSvg/> : <PrintSvg/>} */}
      <Icon
        component={props.disabled ? DisablePrintSvg : PrintSvg}
        {...iconProps}
        theme="outlined"
      />
    </ButtonRevert>
  );
};

export const ViewDetailButton = ({ text, iconProps, ...props }) => {
  return (
    <ButtonRevert {...props} className="ant-btn-icon-only">
      <text>{text}</text>
      <Icon
        component={props.disabled ? DisableViewDetail : ViewDetail}
        {...iconProps}
      />
    </ButtonRevert>
  );
};

export const DeleteButton = ({ text, iconProps, ...props }) => {
  return (
    <ButtonRevert {...props} className="ant-btn-icon-only">
      <text>{text}</text>
      <Icon
        component={props.disabled ? DisableDeleteSvg : DeleteSvg}
        {...iconProps}
      />
    </ButtonRevert>
  );
};

export const AddButton = ({ text, iconProps, ...props }) => {
  return (
    <ButtonRevert {...props} className="ant-btn-icon-only">
      <text>{text}</text>
      <Icon
        component={props.disabled ? DisableAddSvg : AddSvg}
        {...iconProps}
      />
    </ButtonRevert>
  );
};

export const CopyButton = ({ text, iconProps, ...props }) => {
  return (
    <ButtonRevert {...props} className="ant-btn-icon-only">
      <text>{text}</text>
      <Icon
        component={props.disabled ? DisableCopyButtonSvg : CopyButtonSvg}
        {...iconProps}
      />
    </ButtonRevert>
  );
};

export const EditButton = ({ text, iconProps, ...props }) => {
  return (
    <ButtonRevert {...props} className="ant-btn-icon-only">
      <text>{text}</text>
      <Icon
        component={props.disabled ? DisableEditSvg : EditSvg}
        {...iconProps}
      />
    </ButtonRevert>
  );
};

export const ImportButton = ({ text, iconProps, ...props }) => {
  return (
    <ButtonRevert {...props} className="ant-btn-icon-only">
      <text>{text}</text>
      <Icon
        component={props.disabled ? DisableImportSvg : ImportSvg}
        {...iconProps}
      />
    </ButtonRevert>
  );
};

export const CaptchaReloadButton = ({ text, iconProps, ...props }) => {
  return (
    <IconButton {...props} className="ant-btn-icon-only">
      {text}
      <Icon component={CaptchaReloadSvg} {...iconProps} />
    </IconButton>
  );
};

ProcessButton.__ANT_BUTTON = true;
RequestApproveButton.__ANT_BUTTON = true;
ApproveAndSignButton.__ANT_BUTTON = true;
RejectButton.__ANT_BUTTON = true;
ExportButton.__ANT_BUTTON = true;
PrintButton.__ANT_BUTTON = true;
ViewDetailButton.__ANT_BUTTON = true;
DeleteButton.__ANT_BUTTON = true;
AddButton.__ANT_BUTTON = true;
CopyButton.__ANT_BUTTON = true;
EditButton.__ANT_BUTTON = true;
ImportButton.__ANT_BUTTON = true;
CaptchaReloadButton.__ANT_BUTTON = true;
