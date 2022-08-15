import React from "react";
import Cookies from "universal-cookie";
import {
  authGetUserInfo,
  authSaveLoggedUser,
  authSetLogin,
  authLogout,
} from "actions";
import ErrorPage from "pages/_error";
import Router from "next/router";
import { getMenu } from "../actions";

const LOGIN_URL = "/login";

const AUTH_ERROR = {
  errorCode: 403,
  errorMessage: "Rất tiếc, bạn không có quyền truy cập trang này.",
};

const cookies = new Cookies();

export const withAuth = (permissions = [], showErrorPage = true) => (
  Component
) => {
  class HOC extends React.Component {
    static async getInitialProps(ctx) {
      const { req, res, store, isServer } = ctx;
      const { dispatch } = store;
      if (!isServer) {
        let {
          authReducer: { isLoggedIn, jwt, authorities },
        } = store.getState();
        if (
          !cookies.get("jwt") ||
          !isLoggedIn ||
          !jwt ||
          permissions.find((v) => !authorities.includes(v))
        ) {
          dispatch(authLogout());
          if (showErrorPage) {
            return { error: AUTH_ERROR };
          } else {
            return Router.redirect(LOGIN_URL);
          }
        }
        return {};
      }
      const { universalCookies } = req;
      const jwt = universalCookies && universalCookies.get("jwt");
      // if (!jwt && showErrorPage) {
      //   return { error: AUTH_ERROR };
      // }
      if (!jwt) {
        return res.redirect(LOGIN_URL);
      }
      try {
        const user = await dispatch(authGetUserInfo(jwt));
        const { accountNonExpired, authorities } = user;
        if (!accountNonExpired) throw new Error();
        const authorities_array = authorities.map(({ authority }) => authority);
        if (
          authorities &&
          !permissions.find((v) => !authorities_array.includes(v))
        ) {
          dispatch(authSetLogin({ jwt }));
          dispatch(authSaveLoggedUser({ jwt, user }));
          await dispatch(getMenu(jwt));
        } else {
          throw new Error();
        }
      } catch (error) {
        res.clearCookie("jwt");
        dispatch(authLogout());
        if (showErrorPage) return { error: AUTH_ERROR };
        else {
          return res.redirect(LOGIN_URL);
        }
      }
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {},
      };
    }
    render() {
      const { error } = this.props;
      if (error) return <ErrorPage {...error} />;
      return <Component {...this.props} />;
    }
  }
  return HOC;
};
