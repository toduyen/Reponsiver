import React from "react";
import { withRouter } from "next/router";
import Component from "components";
import { withConnect, withAuth } from "hocs";
import { ManagerLayout } from "layouts";
import Page from "containers/TEM/RegisterUsingSearch";

@withRouter
@withAuth([], true)
@withConnect((state) => ({
  auth: state.authReducer,
}))
class App extends Component {
  static async getInitialProps({ req }) {
    let props = await super.getInitialProps({ req });
    //add more code
    return props;
  }
  render() {
    return (
      <ManagerLayout>
        <Page />
      </ManagerLayout>
    );
  }
}

export default App;
