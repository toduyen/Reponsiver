import React from "react";
import { Doughnut } from 'react-chartjs-2';

class BottomCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: [
                    'Đã xét duyệt',
                    'Đơn vị trình',
                    'Yêu cầu sửa',
                ],
                datasets: [{
                    data: [65, 95, 70],
                    backgroundColor: [
                        '#16966A',
                        '#00BCD5',
                        '#FFA726'
                    ],
                    hoverBackgroundColor: [
                        '#16966A',
                        '#00BCD5',
                        '#FFA726'
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
                        <h4>Tình hình thực năm 2020</h4>
                    </div>

                    <div className="content-progress align-items-start has-pd-bt">
                        <div className="total-sus title-bg">
                            <div className="count">
                                <h5>
                                    Tổng số: <span>2.366.319.000</span>
                                </h5>
                            </div>

                            <div className="subs-content">
                                <div className="info">
                                    <h4>10.000.000</h4>
                                    <span>CN1a</span>
                                </div>

                                <div className="info">
                                    <h4>20.000.000</h4>
                                    <span>CN1a</span>
                                </div>

                                <div className="info">
                                    <h4>356.319.000</h4>
                                    <span>CN1a</span>
                                </div>
                            </div>
                        </div>

                        <div className="progress-content progress-bg">
                            <div className="pie-sm">
                            <Doughnut
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
                                <span className="count-sm-pie">CN1 a 70%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BottomCenter;