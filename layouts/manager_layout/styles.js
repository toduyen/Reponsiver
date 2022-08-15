import styled from "styled-components";
import { Layout, Button as AntButton } from "antd";

const { Header, Content } = Layout;

const LayoutWrapper = styled(Layout)`
  min-height: 100vh;
  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  .trigger:hover {
    color: #1890ff;
  }
  
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }
`;

const HeaderWrapper = styled(Header)`
  background: #f1d5a3;
  border-bottom: 3px solid #915715;
  background-image: url(${require("../../static/images/bg_hd.png")});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 87px;
  padding: 4px;
  display: flex;
`;

const ContentWrapper = styled(Content)`
  padding: 10px;
  background: #ffffff;
  position: relative;
`;

const IconButton = styled(AntButton)`
  background-color: transparent !important;
  border-color: #ba7925;
  color: #ba7925;
`;

export { LayoutWrapper, HeaderWrapper, ContentWrapper, IconButton };
