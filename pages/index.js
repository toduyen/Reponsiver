import React from "react";
import { withRouter } from "next/router";
import Component from "components";
import { ManagerLayout } from "layouts";
import { withConnect, withAuth } from "hocs";
import Dashboard from "../containers/Dashboard";

@withAuth([], true)
@withRouter
@withConnect((state) => ({}))
class App extends Component {
  static async getInitialProps({ req }) {
    let props = await super.getInitialProps({ req });
    //add more code
    return props;
  }
  render() {
    return <ManagerLayout >
      <Dashboard />
    </ManagerLayout>;
  }
}

export default App;
