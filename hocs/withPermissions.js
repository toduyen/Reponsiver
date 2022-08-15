import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withConnect } from "./withConnect";


@withConnect((state) => ({ ...state.authReducer }))
export class WithPermissions extends React.Component {
  render() {
    const { isLoggedIn, authorities, permissions = [], children } = this.props;
    if (!isLoggedIn || permissions.find((v) => !authorities.includes(v))) {
      return "";
    }
    return children;
  }
}

//TODO: change code; not yet optimize
//TODO: use useSelector --> v5
export const withPermissionsResult = (permissions = [], props) => {
  const { isLoggedIn, authorities, children } = props;
  return !isLoggedIn || permissions.find((v) => !authorities.includes(v));
};


export const withPermissions = (permissions = []) => (Component) => {
  const mapStateToProps = (state) => ({ ...state.authReducer });
  class HOC extends React.Component {
    render() {
      const { forwardRef } = this.props;
      const { isLoggedIn, authorities } = this.props;
      if (!isLoggedIn || permissions.find((v) => !authorities.includes(v))) {
        return "";
      }
      return <Component {...this.props} {...this.state} ref={forwardRef} />;
    }
  }
  return connect(mapStateToProps, null, null, { forwardRef: true })(
    React.forwardRef((props, ref) => <HOC {...props} forwardRef={ref} />)
  );
};
