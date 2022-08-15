import { connect } from "react-redux";

export const withConnect = (
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options = { forwardRef: true }
) => (Component) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  )(Component);
};
