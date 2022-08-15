import React from "react";
import { ProgressDashBoard, Div } from './styles/test';
import { Bar } from 'react-chartjs-2';

class BottomRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Chỉ tiêu 1',
                        backgroundColor: 'rgba(0,138,58,0.7)',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        barThickness: 10,
                    },
                    {
                        label: 'Chỉ tiêu 2',
                        backgroundColor: 'rgba(255,154,48,0.7)',
                        data: [60, 50, 70, 71, 76, 75, 60],
                        barThickness: 10,
                    },
                    {
                        label: 'Chỉ tiêu 3',
                        backgroundColor: 'rgba(114,101,145,0.7)',
                        data: [60, 50, 70, 71, 76, 75, 60],
                        barThickness: 10,
                    }
                ]
            }
        };
    }


    render() {
        const { data } = this.state
        return (
            <div className="col-lg-12">
                <div className="home-chart-box">
                    <div className="title-chart">
                        <h4>Tình hình thực hiện năm 2020</h4>
                    </div>

                    <div className="content-progress">
                        <div className="total-sus">
                            <span>Tổng số cuộc đã thực hiện</span>
                            <h4>89591</h4>
                        </div>

                        <div className="progress-content">
                            <div className="progress-box">
                                <div className="title">
                                    <label>Chưa triển khai</label>
                                    <span>35%</span>
                                </div>
                                <Div>
                                   <ProgressDashBoard color="#F3C921" className="custom-transition" percent={35} showInfo={false} />
                                </Div>
                                {/* <div className="progress">
                                    <div
                                        className="progress-bar progress-bar-animated cl-4"
                                        role="progressbar"
                                        aria-valuenow="35"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div> */}
                            </div>

                            <div className="progress-box">
                                <div className="title">
                                    <label>Đang triển khai</label>
                                    <span>60%</span>
                                </div>
                                <Div>
                                   <ProgressDashBoard color="#F38321" className="custom-transition" percent={60} showInfo={false} />
                                </Div>

                                {/* <div className="progress">
                                    <div
                                        className="progress-bar progress-bar-animated cl-2"
                                        role="progressbar"
                                        aria-valuenow="60"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div> */}
                            </div>

                            <div className="progress-box">
                                <div className="title">
                                    <label>Đã triển khai</label>
                                    <span>90%</span>
                                </div>
                                <Div>
                                   <ProgressDashBoard color ="#169645" className="custom-transition" percent={90} showInfo={false} />
                                </Div>
                                {/* <div className="progress">
                                    <div
                                        className="progress-bar progress-bar-animated cl-5"
                                        role="progressbar"
                                        aria-valuenow="5"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BottomRight;