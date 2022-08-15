import React from "react";
import { Result, Button } from "antd";
import { withRouter } from "next/router";
import "styles/main.scss";

const LOGIN_URL = "/login";

const MESSAGE_403 = "Sorry, you are not authorized to access this page.";
const MESSAGE_404 = "Sorry, the page you visited does not exist.";
const MESSAGE_500 = "Sorry, the server is wrong.";
const MESSAGE_DEFAULT = "There are some problems with your operation.";

@withRouter
class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const errorCode = res ? res.statusCode : err ? err.statusCode : null;
    const errorMessage = res ? res.message : err ? err.message : null;
    return { errorCode, errorMessage };
  }
  render() {
    const { errorCode, errorMessage } = this.props;
    switch (errorCode) {
      case 403: {
        return (
          <Result
            status="403"
            title="403"
            subTitle={errorMessage || MESSAGE_403}
            extra={
              <Button href={LOGIN_URL} type="primary" onClick={this.onClick}>
                Về trang chủ
              </Button>
            }
          />
        );
      }
      case 404: {
        return (
          <Result
            status="404"
            title="404"
            subTitle={errorMessage || MESSAGE_404}
            extra={
              <Button href={LOGIN_URL} type="primary" onClick={this.onClick}>
                Về trang chủ
              </Button>
            }
          />
        );
      }
      case 500: {
        return (
          <Result
            status="500"
            title="500"
            subTitle={errorMessage || MESSAGE_500}
            extra={
              <Button href={LOGIN_URL} type="primary" onClick={this.onClick}>
                Về trang chủ
              </Button>
            }
          />
        );
      }
      default: {
        return (
          <Result
            status={errorCode}
            subTitle={errorMessage || MESSAGE_DEFAULT}
            extra={
              <Button href={LOGIN_URL} type="primary" onClick={this.onClick}>
                Về trang chủ
              </Button>
            }
          />
        );
      }
    }
  }
}

export default ErrorPage;
