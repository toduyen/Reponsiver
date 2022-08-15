import React from "react";
import {
  Row,
  Col,
  Typography,
  Form as AntForm,
  Button as AntButton,
  Spin,
} from "antd";
import { withConnect } from "hocs";
import {
  LayoutWrapper,
  popUpLogin,
  imgLogo,
  logoText,
  ctnName,
  txtTitle1,
  txtTitle2,
  ctnBtn,
  lgInput,
  Input as AntInput,
  Select as AntSelect,
} from "./styles";
import logoThue from "../../static/images/logo-thue-nha-nuoc.png";
// import loginLogoText from "/static/images/login-hddt.png";
const loginLogoText = "/static/images/login-hddt.svg";

import "./btnStyles.css";
import {
  authAuthenticate,
  layoutToggleLoading,
  authLogout,
  authSaveLoggedUser,
  authGetUserInfo,
  getMenu,
} from "actions";
const { Text } = Typography;
import Router from "next/router";
import { DOMAIN } from "consts";
const { Item: AntFormItem } = AntForm;
const INPUT_COL = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  className: "custom-label-login",
};

@withConnect((state) => ({
  loading: state.loading.isLoading,
  ...state.authReducer,
}))
class Login extends React.Component {
  async componentDidMount() {
    // let { dispatch } = this.props;
    // await dispatch(testSendGet());
    if (this.props.isLoggedIn) {
      Router.push("/");
    }
  }
  submitLogin = async (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          dispatch(layoutToggleLoading(true));
          let { token: jwt } = await dispatch(
            // authAuthenticate({
            //   username: "longlh",
            //   password: "123456a@",
            // })
            authAuthenticate(values)
          );
          let user = await dispatch(authGetUserInfo(jwt));
          dispatch(authSaveLoggedUser({ jwt, user }));
          await dispatch(getMenu(jwt));
          Router.push("/");
          setTimeout(() => {
            dispatch(getMenu(jwt));
          }, 2000);
        } catch (error) {
          dispatch(authLogout());
        } finally {
          dispatch(layoutToggleLoading(false));
        }
      }
    });
  };
  render() {
    const {
      form: { getFieldDecorator },
      loading,
      isLoggedIn,
    } = this.props;
    return (
      <Spin spinning={loading} tip="Đang xử lý...">
        <LayoutWrapper>
          <div style={popUpLogin}>
            <div>
              <img src={logoThue} alt="Logo" style={imgLogo} />
            </div>

            <div style={logoText}>
              <img src={loginLogoText} alt="LogoText" />
            </div>

            {/* <div style={ctnName}>
              <text style={txtTitle1}>Hệ thống hoá đơn điện tử</text>
            </div>
            <div style={ctnName}>
              <text style={txtTitle2}>Tổng cục thuế</text>
            </div> */}
            <div style={{ marginTop: "25px" }} />
            <AntForm className="home-tabs-login" onSubmit={this.submitLogin}>
              <Row gutter={12} type="flex" justify="center">
                <Col span={20}>
                  <AntFormItem
                    {...INPUT_COL}
                    required={false}
                    label="Tên đăng nhập"
                  >
                    {getFieldDecorator("username", {
                      normalize: (value, prevValue) => {
                        if (value === "") return value;
                        if (value) {
                          value = value
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .replace(/đ/g, "d")
                            .replace(/Đ/g, "D");
                          if (/^[a-zA-Z0-9-_.]*$/.test(value)) return value;
                        }
                        return prevValue;
                      },
                      rules: [
                        {
                          required: true,
                          message: "Bạn chưa nhập Tên đăng nhập",
                        },
                        {
                          whitespace: true,
                          message: "Bạn chưa nhập Tên đăng nhập",
                        },
                      ],
                    })(
                      <AntInput style={lgInput} placeholder="Tên đăng nhập" />
                    )}
                  </AntFormItem>
                </Col>
                <Col span={20}>
                  <AntFormItem {...INPUT_COL} required={false} label="Mật khẩu">
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Bạn chưa nhập Mật khẩu",
                        },
                        {
                          whitespace: true,
                          message: "Bạn chưa nhập Mật khẩu",
                        },
                        {
                          min: 8,
                          message: "Mật khẩu có độ dài [8, 15] ký tự.",
                        },
                      ],
                    })(
                      <AntInput
                        type="password"
                        placeholder="Mật khẩu"
                        style={lgInput}
                        maxLength="30"
                        minLength="8"
                      />
                    )}
                  </AntFormItem>
                  <AntFormItem
                    label="Tên miền"
                    {...INPUT_COL}
                    required={false}
                    style={{ textAlign: "left" }}
                  >
                    {getFieldDecorator("domain", {
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "Bạn chưa chọn Domain",
                        },
                      ],
                    })(
                      <AntSelect>
                        <AntSelect.Option value={""}>Chọn</AntSelect.Option>
                        {DOMAIN.map((item) => (
                          <AntSelect.Option key={item} value={item}>
                            {item}
                          </AntSelect.Option>
                        ))}
                      </AntSelect>
                    )}
                  </AntFormItem>
                </Col>
              </Row>
              <div className="login-btn" style={ctnBtn}>
                <div class="outer-container">
                  <div class="lg-row">
                    <div class="lg-cell lg-wide">
                      <button type="submit" className="color1">
                        Đăng nhập
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AntForm>
          </div>
        </LayoutWrapper>
      </Spin>
    );
  }
}

export default AntForm.create()(Login);
