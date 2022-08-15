import { Tabs as AntTabs } from 'antd';
import styled from 'styled-components';

export const Tabs = styled(AntTabs)`
  .ant-tabs-nav-container {
    border-bottom: 1px solid #e8e8e8;
    // background-color: #F2F2F2;
  }
  .ant-tabs-nav .ant-tabs-tab {
    min-width: 100px;
    clip-path: polygon(0 0, 90% 0, 100% 100%, 10% 100%);
    background-color: #C8C8C8;
    color: black;
    margin-right: auto;
    flex: 0 0 50%;
    border-top: 1px solid #9B9B9B;
    padding-right: 25px;
  }
  .ant-tabs-nav {
    padding: .5rem 1rem;
    padding-left: 0;
    padding-bottom: 0;
  }
  .ant-modal-body .ant-tabs-nav {
    padding-left: 0 !important;
  }
  .ant-tabs-nav .ant-tabs-tab:not(:first-child) {
    margin-left: -25px;
    padding-left: 30px;
    margin-right: 9px;
  }
  .ant-tabs-nav .ant-tabs-tab:first-child {
    clip-path: polygon(0 0, 90% 0, 100% 100%, 0 100%);
    border-left: 1px solid #9B9B9B;
  }
  .ant-tabs-nav .ant-tabs-tab:not(.ant-tabs-tab-active):not(:first-child) {
    padding-left: 30px !important;
  }
  .ant-tabs-nav .ant-tabs-tab:not(.ant-tabs-tab-active) span {
    margin-right: 13px;
  }
  .ant-tabs-tab-active {
    background-color: #fff !important;
    color: #915715  !important;
    font-weight: bold  !important;
    border-color: #dee2e6 #dee2e6 #fff;
    span {
      padding-right: 10px;
    }
    padding-right: 25px;
  }
  .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    display: none !important;
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    background: #C8C8C8;
  }
`;

export const TabsModal = styled(AntTabs)`
  .ant-tabs-nav-container {
    border-bottom: 1px solid #e8e8e8;
  }
  .ant-tabs-bar {
    margin: 0px;
  }
  .ant-tabs-nav .ant-tabs-tab {
    min-width: 100px;
    clip-path: polygon(0 0, 85% 0, 100% 100%, 15% 100%);
    background-color: #C8C8C8;
    color: black;
    margin-right: auto;
    flex: 0 0 50%;
  }
  .ant-tabs-nav {
    padding: .5rem 1rem;
    padding-left: 0;
    padding-bottom: 0;
  }
  .ant-modal-body .ant-tabs-nav {
    padding-left: 0 !important;
  }
  .ant-tabs-nav .ant-tabs-tab:not(:first-child) {
    margin-left: -21px;
    padding-left: 30px;
  }
  .ant-tabs-nav .ant-tabs-tab:first-child {
    clip-path: polygon(0 0, 85% 0, 100% 100%, 0% 100%);
  }
  .ant-tabs-nav .ant-tabs-tab:not(.ant-tabs-tab-active):not(:first-child) {
    padding-left: 30px !important;
  }
  .ant-tabs-nav .ant-tabs-tab:not(.ant-tabs-tab-active) span {
    margin-right: 13px;
  }
  .ant-tabs-content {
    background-color: #fff !important;
  }
  .ant-tabs-tab-active{
    background-color: #fff !important;
    color: #915715  !important;
    font-weight: bold  !important;
    border-color: #dee2e6 #dee2e6 #fff;
  }
  .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    display: none !important;
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    background: #C8C8C8;
  }
  .scroll-data {
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(100vh - 50vh);
  }
  .ant-tabs-tabpane {
    background-color: #fff;
    height: 80vh;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;