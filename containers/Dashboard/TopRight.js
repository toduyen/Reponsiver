import React from "react";
import { Line } from 'react-chartjs-2';

class TopRight extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: ['Tháng một', 'Tháng hai', 'Tháng ba', 'Tháng tư', 'Tháng năm'],
                datasets: [
                    {
                        label: '',
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: '#169638',
                        // backgroundColor : 'linear-gradient(to right, #20f08b, #07dfb1)',
                        borderColor: '#169638',
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56]
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
                        <h4>Doanh thu của Cục thuế Hà Nội</h4>
                    </div>
                    <div className="second-pie">
                        <Line
                            data={data}
                            height={400}
                            legend={{
                                position: 'bottom'
                            }}
                            options={{
                                maintainAspectRatio: false,
                                title: {
                                    display: false,
                                    text: 'Tình hình thực hiện'
                                }
                            }} />
                    </div>

                    <div className="sub-for-bars">
                        <div className="content-sub">
                            <div className="infor">
                                <h4>Doanh thu của đơn vị theo từng tháng</h4>
                            </div>

                            {/* <div className="infor">
                                <h4>Số thực hiện</h4>
                            </div>

                            <div className="infor">
                                <h4>Số thực hiện</h4>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TopRight;