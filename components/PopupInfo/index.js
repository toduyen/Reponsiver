import { Modal } from "antd";

export const popupInfo = (title = "Title", content = "defaut") => {
  Modal.info({
    title: title,
    content: content,
    centered: true,
    okText: "Đóng",
    onOk: () => {},
  });
};
