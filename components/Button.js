import React from "react";
import { Tooltip } from "antd";

export const ButtonTable = ({ type, ...props }) => {
  let src = "";
  let title = "";
  switch (type) {
    case "add":
      title = "Thêm";
      src = "../../static/images/icon_active/icon_them.svg";
      break;
    case "delete":
      title = "Xóa";
      src = "../../static/images/icon_active/icon_xoa_2.svg";
      break;
    case "deleteAll":
      title = "Xóa đã chọn";
      src = "../../static/images/icon_active/icon_xoa_2.svg";
      break;
    default:
      break;
  }

  return (
    <Tooltip title={title}>
      <img
        alt=""
        className="imgSvg"
        style={{ width: 20, cursor: "pointer" }}
        src={src}
        {...props}
      />
    </Tooltip>
  );
};
