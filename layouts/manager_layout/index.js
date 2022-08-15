import React, { Component } from "react";
import { withRouter } from "next/router";
import { Layout, Popover, Tooltip, Menu } from "antd";
import { Spin } from "components";
import {
  LayoutWrapper,
  HeaderWrapper,
  ContentWrapper,
  IconButton,
} from "./styles";
import "./menuStyles.scss";
import { withConnect, SocketProvider } from "hocs";
import { authLogout, layoutToggleLoading, logoutCBT } from "actions";
import ChangePassword from "containers/ChangePassword";
import SideMenu from "./SideMenu";
import isEmpty from "lodash/isEmpty";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

// const logoThue = "/static/images/logo_login.svg";
const logoThue = "/static/images/cbt-logo-chu.svg";
@withRouter
@withConnect((state) => ({
  loading: state.loading.isLoading,
  menuPrivileges: state.commonReducer.menuPrivileges,
  ...state.authReducer,
}))
class Manager extends Component {
  state = { visible: false, collapsed: false };
  togglePopup = (visible) => () => {
    this.setState({ visible });
  };
  onLogout = async () => {
    const { dispatch, router, jwt } = this.props;
    try {
      dispatch(layoutToggleLoading(true));
      const logoutResponse = await dispatch(logoutCBT(jwt));

      if (logoutResponse?.status === 200) dispatch(authLogout());

      router.push("/login");
    } catch (error) {
    } finally {
      dispatch(layoutToggleLoading(false));
    }
  };
  render() {
    const { visible } = this.state;
    const { loading, user } = this.props;
    const { name, tcqt, fullName } = user || {};
    return (
      <SocketProvider>
        <Spin spinning={loading} tip="Đang xử lý..." />
        <ChangePassword visible={visible} onCancel={this.togglePopup(false)} />
        <LayoutWrapper>
          <HeaderWrapper>
            <a href="/">
              <img
                src={logoThue}
                alt="Tổng Cục Thuế Việt Nam"
                style={{ height: 77 }}
              />
            </a>
            <div style={{ display: "grid", marginLeft: "10px" }}></div>
            <div style={{ position: "absolute", right: 20 }}>
              <Popover
                placement="bottomRight"
                content={
                  <span
                    style={{ cursor: "pointer" }}
                  // onClick={this.togglePopup(true)}
                  >
                    {`${!isEmpty(name) ? name : fullName} - ${tcqt}`}
                  </span>
                }
                trigger="click"
              >
                <Tooltip
                  title={`${!isEmpty(name) ? name : fullName} - ${tcqt}`}
                >
                  <IconButton size="large" shape="circle" icon="user" />
                </Tooltip>
              </Popover>
              <Tooltip title="Đăng xuất">
                <IconButton
                  size="large"
                  shape="circle"
                  icon="arrow-right"
                  onClick={this.onLogout}
                  style={{ marginLeft: 10 }}
                />
              </Tooltip>
            </div>
          </HeaderWrapper>
          <Layout>
            <Sider style={{   }} width={{}}>
              <SideMenu />
            </Sider>
            <Layout>
              <ContentWrapper>{this.props.children}</ContentWrapper>
            </Layout>
          </Layout>
        </LayoutWrapper>
      </SocketProvider>
    );
  }
}

export const ManagerLayout = Manager;
