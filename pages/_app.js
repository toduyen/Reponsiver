import React from "react";
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import { Provider } from "react-redux";
import Router, { withRouter } from "next/router";
import App, { Container } from "next/app";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import { makeStore } from "store";
import { PersistGate } from "redux-persist/integration/react";
import "moment/locale/vi";
import "react-toastify/scss/main.scss";
import "antd/dist/antd.css";
import "nprogress/nprogress.css";
import "styles/main.scss";
import NProgress from "nprogress";
import { ConfigProvider } from "antd";
import viVN from "antd/lib/locale/vi_VN";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    };
  }

  render() {
    const { Component, pageProps, store, router } = this.props;
    const title = "Tem Điện Tử";
    return (
      <Container>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/static/images/logo-thue-nha-nuoc.png" />
          <title>{title}</title>
        </Head>
        <Provider store={store}>
          <PersistGate persistor={store.__persistor} loading={<div />}>
            <CookiesProvider>
              <ConfigProvider locale={viVN}>
                <Component router={router} {...pageProps} />
                <ToastContainer
                  position="bottom-right"
                  autoClose={3000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnVisibilityChange
                  draggable
                  pauseOnHover
                />
              </ConfigProvider>
            </CookiesProvider>
          </PersistGate>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(withRouter(MyApp));
