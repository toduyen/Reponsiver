import React from "react";
import { notification } from "antd";

const placement = "bottomRight";

export default {
  info(message) {
    notification.info({ message, placement });
  },
  success(message) {
    notification.success({ message, placement });
  },
  error(message) {
    notification.error({ message, placement });
  },
  errorStrict(err) {
    const message = err?.response?.data?.message || err?.message;
    const description = err?.response?.data?.details || "";
    notification.error({
      message,
      description,
      placement,
    });
  },
};
