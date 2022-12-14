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
      <Spin spinning={loading} tip="??ang x??? l??...">
        <LayoutWrapper>
          <div style={popUpLogin}>
            <div>
              <img src={logoThue} alt="Logo" style={imgLogo} />
            </div>

            <div style={logoText}>
              <img src={loginLogoText} alt="LogoText" />
            </div>

            {/* <div style={ctnName}>
              <text style={txtTitle1}>H??? th???ng ho?? ????n ??i???n t???</text>
            </div>
            <div style={ctnName}>
              <text style={txtTitle2}>T???ng c???c thu???</text>
            </div> */}
            <div style={{ marginTop: "25px" }} />
            <AntForm className="home-tabs-login" onSubmit={this.submitLogin}>
              <Row gutter={12} type="flex" justify="center">
                <Col span={20}>
                  <AntFormItem
                    {...INPUT_COL}
                    required={false}
                    label="T??n ????ng nh???p"
                  >
                    {getFieldDecorator("username", {
                      normalize: (value, prevValue) => {
                        if (value === "") return value;
                        if (value) {
                          value = value
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .replace(/??/g, "d")
                            .replace(/??/g, "D");
                          if (/^[a-zA-Z0-9-_.]*$/.test(value)) return value;
                        }
                        return prevValue;
                      },
                      rules: [
                        {
                          required: true,
                          message: "B???n ch??a nh???p T??n ????ng nh???p",
                        },
                        {
                          whitespace: true,
                          message: "B???n ch??a nh???p T??n ????ng nh???p",
                        },
                      ],
                    })(
                      <AntInput style={lgInput} placeholder="T??n ????ng nh???p" />
                    )}
                  </AntFormItem>
                </Col>
                <Col span={20}>
                  <AntFormItem {...INPUT_COL} required={false} label="M???t kh???u">
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "B???n ch??a nh???p M???t kh???u",
                        },
                        {
                          whitespace: true,
                          message: "B???n ch??a nh???p M???t kh???u",
                        },
                        {
                          min: 8,
                          message: "M???t kh???u c?? ????? d??i [8, 15] k?? t???.",
                        },
                      ],
                    })(
                      <AntInput
                        type="password"
                        placeholder="M???t kh???u"
                        style={lgInput}
                        maxLength="30"
                        minLength="8"
                      />
                    )}
                  </AntFormItem>
                  <AntFormItem
                    label="T??n mi???n"
                    {...INPUT_COL}
                    required={false}
                    style={{ textAlign: "left" }}
                  >
                    {getFieldDecorator("domain", {
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "B???n ch??a ch???n Domain",
                        },
                      ],
                    })(
                      <AntSelect>
                        <AntSelect.Option value={""}>Ch???n</AntSelect.Option>
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
                        ????ng nh???p
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
