import React from "react";
import { Doughnut } from 'react-chartjs-2';


class TopLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: [
                    'Hóa đơn có mã',
                    'Hóa đơn không mã',
                    'Hóa đơn không mã - bảng tổng hợp',
                    'Hóa đơn theo lần phát sinh',
                ],
                datasets: [{
                    data: [1234, 1234, 89, 1234],
                    backgroundColor: [
                        '#529616',
                        '#AE8B00',
                        '#FFB100',
                        '#ECE03D'
                    ],
                    hoverBackgroundColor: [
                        '#529616',
                        '#AE8B00',
                        '#FFB100',
                        '#ECE03D'
                    ]
                }],
            },
        };
    }


    render() {
        const { data } = this.state
        return (
            <div className="col-lg-12">
                <div className="home-chart-box">
                    <div className="title-chart">
                        <h4>Số lượng hóa đơn tháng 4 năm 2021 của Cục thuế Hà Nội</h4>
                    </div>
                    <div className="row has-pd">
                        <div className="col-12 col-lg-7">
                            <div className="first-pie">
                                <Doughnut
                                    height={315}
                                    width={315}
                                    data={data}
                                    legend={{
                                        display: false,
                                        position: 'right'
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                        title: {
                                            display: false,
                                            text: 'Tình hình thực hiện'
                                        },
                                        tooltips: { enabled: true }
                                    }} />
                                <div className="count-bg-pie">
                                    <span>Tổng số hóa đơn</span>
                                    <h5>234627</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-5 has-bg">
                            <div className="sub-for-pie">
                                <div className="content-sub">
                                    <div className="info">
                                        <h4>Hóa đơn có mã</h4>
                                        <span>1234</span>
                                    </div>

                                    <div className="info">
                                        <h4>Hóa đơn không mã</h4>
                                        <span>1234</span>
                                    </div>

                                    <div className="info">
                                        <h4>Hóa đơn không mã - bảng tổng hợp</h4>
                                        <span>89</span>
                                    </div>

                                    <div className="info">
                                        <h4>Hóa đơn theo lần phát sinh</h4>
                                        <span>129</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TopLeft;