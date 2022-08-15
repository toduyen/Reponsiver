import React from "react";
import { withRouter } from "next/router";
import Component from "components";
import { withConnect } from "hocs";
import { ManagerLayout } from "layouts";
// import Example from "containers/Example";

@withRouter
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
        {/* <Example /> */}
      </ManagerLayout>
    );
  }
}

export default App;