import React from "react";
import { NextAuth } from "next-auth/client";

export default class extends React.Component {
  static async getInitialProps({ req }) {
    return {
      session: await NextAuth.init({ req }), // Add this.props.session to all pages
    };
  }
}

export * from "./Input";
export * from "./ContractForm";
export * from "./Table";
export * from "./PagePattern";
export * from "./Tabs";
export * from "./Modal";
export * from "./ModalApproval";
export * from "./PopupInchargePattern";
export * from "./CustomModal";
export * from "./ModalReject";
export * from "./Spin";
export * from "./FormPattern";
export * from "./Button";
export * from "./Captcha";
export * from "./PaperApproval";
export * from "./PopupInfo";
export * from "./ModalReport";
export * from "./PopupDetailRelatedInformation";
