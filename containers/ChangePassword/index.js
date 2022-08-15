import React from "react";
import { withConnect } from "hocs";
import { withRouter } from "next/router";
import { Row, Col, Form } from "antd";
import { AlignBottomItem, BorderBottomInputPassword } from "../../components/patterns";
import { Button } from "../../components/patterns";
import { layoutToggleLoading, authChangePassword} from "actions";
import { CustomModal as AntModal } from "components";

@withConnect((state) => ({ ...state.authReducer }))
@withRouter
class ChangePassword extends React.Component {
  // onSubmit = (e) => {
  //   e.preventDefault();
  //   const { dispatch, jwt, form, onCancel } = this.props;
  //   form.validateFields(async (err, values) => {
  //     if (!err) {
  //       const data = {
  //         password: values.old_password,
  //         new_password: values.new_password,
  //       };
  //       dispatch(layoutToggleLoading(true));
  //       try {
  //         await dispatch(authChangePassword(data, jwt));
  //         form.resetFields();
  //         onCancel();
  //       } catch (error) {
  //         const message = error?.response?.data?.message || error?.message;
  //         form.setFields({
  //           old_password: {
  //             value: values.old_password,
  //             errors: [new Error(message)],
  //           },
  //         });
  //       } finally {
  //         dispatch(layoutToggleLoading(false));
  //       }
  //     }
  //   });
  // };
  onBlur = () => {
    const { form } = this.props;
    form.validateFields(["confirm_password"]);
  };
  comparePassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("new_password")) {
      callback("Mật khẩu nhập lại không trùng nhau");
    } else {
      callback();
    }
  };
  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      visible,
    } = this.props;
    return (
      <AntModal
        title="Thay đổi mật khẩu"
        visible={visible}
        footer={null}
        onCancel={onCancel}
      >
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col span={24}>
              <AlignBottomItem
                label={
                  <>
                    <span>Mật khẩu cũ</span> &nbsp;
                    <span style={{ color: "red" }}>(*)</span>
                  </>
                }>
                {getFieldDecorator("old_password", {
                  rules: [
                    {
                      required: true,
                      message: "Mật khẩu không được bỏ trống",
                    },
                  ],
                })(<BorderBottomInputPassword />)}
              </AlignBottomItem>
            </Col>
            <Col span={24}>
              <AlignBottomItem
                label={
                  <>
                    <span>Mật khẩu mới</span> &nbsp;
                  <span style={{ color: "red" }}>(*)</span>
                  </>
                }>
                {getFieldDecorator("new_password", {
                  rules: [
                    {
                      required: true,
                      message: "Mật khẩu không được bỏ trống",
                    },
                    {
                      min: 8,
                      message: "Mật khẩu phải có ít nhất 8 ký tự",
                    },
                    {
                      max: 15,
                      message: "Mật khẩu phải không có quá 15 ký tự",
                    },
                    {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\&\*\(\)\_\+\-\=\[\]\|\,\.\/\?\>\<])[A-Za-z\d\!\@\#\$\%\&\*\(\)\_\+\-\=\[\]\|\,\.\/\?\>\<]{8,15}$/,
                      message:
                        "Mật khẩu phải bao gồm chữ hoa, chữ thường, chữ số, ký tự đặc biệt",
                    },
                  ],
                })(<BorderBottomInputPassword />)}
              </AlignBottomItem>
            </Col>
            <Col span={24}>
              <AlignBottomItem
                label={
                  <>
                    <span>Nhập lại mật khẩu</span> &nbsp;
                  <span style={{ color: "red" }}>(*)</span>
                  </>
                }>
                {getFieldDecorator("confirm_password", {
                  rules: [
                    {
                      required: true,
                      message: "Nhập lại mật khẩu không được bỏ trống",
                    },
                    {
                      validator: this.comparePassword,
                    },
                  ],
                })(<BorderBottomInputPassword onBlur={this.onBlur} />)}
              </AlignBottomItem>
            </Col>
            <Col span={24}>
              <Row
                gutter={36}
                type="flex"
                justify="center"
                style={{ marginTop: 10 }}
              >
                <Col>
                  <Button type="primary" htmlType="submit">
                    Đổi mật khẩu
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" onClick={onCancel}>
                    Hủy bỏ
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </AntModal>
    );
  }
}

export default Form.create()(ChangePassword);
