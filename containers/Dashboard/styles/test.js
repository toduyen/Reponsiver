import styled from "styled-components";
import { Progress } from "antd";

export const Div = styled.div`
  background: #e2e2e2;
  border-radius: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 13px;
`;
export const ProgressDashBoard = styled(Progress)`
  .ant-progress-inner {
    background: none;
    height: 100%;
  }
  .ant-progress-bg {
    padding: 6px;
    background: ${(props) => (props.color ? props.color : "")} !important;
  }
`;

export const DashboardWrapper = styled.div`
  background: rgba(236,215,177, 0.3);
  background-image: url("/static/images/layoutLogin.png");
  background-repeat: no-repeat;
  background-position: center;
  background-origin: content-box;
  background-size: 130%;
  width: calc(100% + 20px);
  height: 100%;
  margin: -10px;
  padding-right: 40px;

  // display: flex;
  // overflow: hidden;

  .main-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .main-content .main-chart .col-12:nth-child(1) .home-chart-box {
    height: 415px;
  }

  .main-content .main-chart .col-12:nth-child(2) .home-chart-box {
    height: 415px;
  }

  .main-content .main-chart {
    padding-top: 30px;
  }
  .home-chart-box {
    -webkit-box-shadow: 0px 0px 15px 1px rgba(229, 229, 229, 0.73);
    box-shadow: 0px 0px 15px 1px rgba(229, 229, 229, 0.73);
    margin-bottom: 30px;
  }
  .home-chart-box .row .has-pd {
    padding: 20px 0px;
  }
  .home-chart-box .row .col-lg-7 {
    padding-bottom: 42px;
    padding-top: 30px;
  }
  .home-chart-box .title-chart {
    background: #e6dfd7;
    padding: 15px 0px 15px 25px;
  }
  .home-chart-box .title-chart h4 {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }
  .home-chart-box .first-pie {
    width: 275px;
    height: 275px;
    margin: auto;
    position: relative;
  }

  .home-chart-box .first-pie canvas {
    margin: 20px 0px;
  }
  .home-chart-box .first-pie .count-bg-pie {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 2;
  }
  .home-chart-box .first-pie .count-bg-pie span {
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
  .home-chart-box .first-pie .count-bg-pie h5 {
    font-size: 20px;
    font-weight: bold;
    color: #164396;
  }

  .home-chart-box .second-pie canvas {
    padding: 20px 47px;
    height: 333px !important;
  }

  .home-chart-box .content-progress {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background: #f9f9f9;
    padding: 40px 20px;
  }
  .home-chart-box .content-progress.has-pd-bt {
    padding-bottom: 75px;
  }
  .home-chart-box .content-progress .total-sus {
    flex: 0 0 34%;
    text-align: center;
  }
  .home-chart-box .content-progress .total-sus.title-bg {
    flex: 0 0 50%;
    text-align: left;
  }

  .home-chart-box .content-progress .total-sus.title-bg .count {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .home-chart-box .content-progress .total-sus.title-bg .count h5 {
    font-size: 17px;
    font-weight: bold;
    color: #000000;
    display: inline-block;
  }
  .home-chart-box .content-progress .total-sus.title-bg .count h5 span {
    display: inline-block;
  }
  .home-chart-box .content-progress .total-sus.title-bg .subs-content .info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .home-chart-box
    .content-progress
    .total-sus.title-bg
    .subs-content
    .info:nth-child(1)
    h4:before {
    background: #16966a;
  }
  .home-chart-box
    .content-progress
    .total-sus.title-bg
    .subs-content
    .info:nth-child(2)
    h4:before {
    background: #00bcd5;
  }
  .home-chart-box
    .content-progress
    .total-sus.title-bg
    .subs-content
    .info:nth-child(3)
    h4:before {
    background: #ffa726;
  }
  .home-chart-box .content-progress .total-sus.title-bg .subs-content .info h4 {
    font-size: 14px;
    position: relative;
    padding-left: 20px;
  }
  .home-chart-box
    .content-progress
    .total-sus.title-bg
    .subs-content
    .info
    h4::before {
    content: "";
    position: absolute;
    width: 11px;
    height: 11px;
    border-radius: 100%;
    left: 0;
    top: 1.5px;
  }
  .home-chart-box
    .content-progress
    .total-sus.title-bg
    .subs-content
    .info
    span {
    font-size: 14px;
    font-size: 18px;
    padding-bottom: unset;
  }
  .home-chart-box .content-progress .total-sus span {
    font-size: 16px;
    color: #000000;
    display: block;
    padding-bottom: 10px;
  }
  .home-chart-box .content-progress .total-sus h4 {
    font-size: 36px;
    font-weight: bold;
    color: #000000;
  }

  .home-chart-box .content-progress .progress-content {
    flex: 0 0 66%;
    padding-left: 20px;
  }
  .home-chart-box .content-progress .progress-content.progress-bg {
    flex: 0 0 50%;
  }

  .home-chart-box .content-progress .progress-content .pie-sm {
    width: 262px;
    position: absolute;
    right: -33px;
  }
  .home-chart-box .content-progress .progress-content .pie-sm .count-sm-pie {
    font-size: 15px;
    display: block;
    font-weight: bold;
    color: #094e88;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
  }

  .home-chart-box .content-progress .progress-content .progress-box {
    padding-bottom: 12px;
  }
  .home-chart-box .content-progress .progress-content .progress-box .title {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .home-chart-box
    .content-progress
    .progress-content
    .progress-box
    .title
    label {
    font-size: 16px;
    color: #094e88;
  }
  .home-chart-box
    .content-progress
    .progress-content
    .progress-box
    .title
    span {
    font-size: 16px;
    color: #094e88;
  }
  .home-chart-box .content-progress .progress-content .progress-box .progress {
    height: 12px;
    background: #e2e2e2;
    border-radius: 6.5px;
  }
  .home-chart-box
    .content-progress
    .progress-content
    .progress-box
    .progress
    .progress-bar {
    width: 0;
  }
  .home-chart-box
    .content-progress
    .progress-content
    .progress-box
    .progress
    .progress-bar.cl-1 {
    background: #ffa726;
  }
  .home-chart-box
    .content-progress
    .progress-content
    .progress-box
    .progress
    .progress-bar.cl-2 {
    background: #f38321;
  }
  .home-chart-box
    .content-progress
    .progress-content
    .progress-box
    .progress
    .progress-bar.cl-3 {
    background: #94ec3d;
  }
  .home-chart-box
    .content-progress
    .progress-content
    .progress-box
    .progress
    .progress-bar.cl-4 {
    background: #f3c921;
  }
  .home-chart-box
    .content-progress
    .progress-content
    .progress-box
    .progress
    .progress-bar.cl-5 {
    background: #169645;
  }
  .home-chart-box .sub-for-pie {
    height: 100%;
    // display: flex;
    background: #f9f9f9;
    // justify-content: center;
    // flex-direction: column;
    // padding: 0px 15px;
    // align-items: center;
  }
  .home-chart-box .sub-for-pie .content-sub {
    height: 100%
    display: flex;
    // flex-wrap: wrap;
    padding: 20px 0px;
    // justify-content: center;
    // flex-direction: column;
    // align-item: center;
  }
  .home-chart-box .sub-for-pie .content-sub .info {
    flex: 0 0 33.33%;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  .home-chart-box .sub-for-pie .content-sub .info h4 {
    display: block;
    font-size: 14px;
    position: relative;
    padding-left: 15px;
  }
  .home-chart-box .sub-for-pie .content-sub .info h4::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 100%;
    left: 0;
    top: 2.5px;
  }
  .home-chart-box .sub-for-pie .content-sub .info:nth-child(1) h4::before {
    background: #529616;
  }
  .home-chart-box .sub-for-pie .content-sub .info:nth-child(2) h4::before {
    background: #AE8B00;
  }
  .home-chart-box .sub-for-pie .content-sub .info:nth-child(3) h4::before {
    background: #FFB100;
  }
  .home-chart-box .sub-for-pie .content-sub .info:nth-child(4) h4::before {
    background: #ECE03D;
  }
  .home-chart-box .sub-for-pie .content-sub .info:nth-child(5) h4::before {
    background: #ffa600;
  }
  .home-chart-box .sub-for-pie .content-sub .info span {
    font-size: 17px;
    color: #164396;
    padding-left: 10px;
  }

  .home-chart-box .sub-for-bars {
    padding-bottom: 10px;
  }
  .home-chart-box .sub-for-bars .content-sub {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .home-chart-box .sub-for-bars .content-sub .infor {
    padding: 0px 6.5px;
  }
  .home-chart-box .sub-for-bars .content-sub .infor h4 {
    font-size: 14px;
    display: inline-block;
    position: relative;
    padding-left: 18px;
  }
  .home-chart-box .sub-for-bars .content-sub .infor h4::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    left: 0;
    top: 2px;
  }
  .home-chart-box .sub-for-bars .content-sub .infor:nth-child(1) h4::before {
    background: #169638;
  }
  .home-chart-box .sub-for-bars .content-sub .infor:nth-child(2) h4::before {
    background: #7b721d;
  }
  .home-chart-box .sub-for-bars .content-sub .infor:nth-child(3) h4::before {
    background: #ffa726;
  }
`;
