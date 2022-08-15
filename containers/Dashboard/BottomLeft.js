import React from "react";
import { ProgressDashBoard, Div } from './styles/test';
class BottomLeft extends React.Component {
    render() {
        return (
            <div className="col-lg-12">
                <div className="home-chart-box">
                    <div className="title-chart">
                        <h4>Tình hình thực hiện năm 2020</h4>
                    </div>

                    <div className="content-progress">
                        <div className="total-sus">
                            <span>Tổng số </span>
                            <h4>76591</h4>
                        </div>

                        <div className="progress-content">
                            <div className="progress-box">
                                <div className="title">
                                    <label>Ngân sách trung ương</label>
                                    <span>35%</span>
                                </div>

                                <Div>
                                   <ProgressDashBoard color="#FFA726" className="custom-transition" percent={35} showInfo={false} />
                                </Div>
                                {/* <div className="progress">
                                    <div className="progress-bar progress-bar-animated cl-1" role="progressbar" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                </div> */}
                            </div>

                            <div className="progress-box">
                                <div className="title">
                                    <label>Ngân sách địa phương</label>
                                    <span>60%</span>
                                </div>

                                <Div>
                                    <ProgressDashBoard color="#F38321" className="custom-transition" percent={60} showInfo={false} />
                                </Div>
                                {/* <div className="progress">
                                    <div className="progress-bar progress-bar-animated cl-2" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                </div> */}
                            </div>

                            <div className="progress-box">
                                <div className="title">
                                    <label>Tài chính ngân hàng</label>
                                    <span>5%</span>
                                </div>

                                <Div>
                                    <ProgressDashBoard color="#94EC3D" className="custom-transition" percent={5} showInfo={false} />
                                </Div>
                                {/* <div className="progress">
                                    <div className="progress-bar progress-bar-animated cl-3" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100"></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BottomLeft;