import React from "react";
import { withRouter } from "next/router";
import Component from "components";
import { ManagerLayout } from "layouts";
import { withConnect } from "hocs";
import {ValidateInput} from "components/patterns"

@withRouter
@withConnect((state) => ({}))
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      validate: {},
      test: 'test',
      formInput: {},
      validateErr: {},
      inputNames: ['username']
    }
  }
  static async getInitialProps({ req }) {
    let props = await super.getInitialProps({ req });
    //add more code
    return props;
  }
  validateFunc = () =>{
    const {formInput, inputNames} = this.state;
    let validateErr = {};
    let valid = true;
    inputNames.forEach(name => {
      validateErr[name] = null;
      const value = formInput[name];
      switch (name) {
        case "username":
          if(value.length > 6) {
            valid = false
            validateErr[name] = "Username tối đa  6 kí tự";
          }
        default:
          break
      }
    })
    this.setState({validateErr})
    return valid;

  }
  onChangeInput = (e) => {
    const {name, value} = e.target;
    const {formInput} = this.state;
    this.setState({formInput: {...formInput, [name]: value}});
  }
  render() {
    const {formInput, validateErr} = this.state;
    return <ManagerLayout>
          <ValidateInput value={formInput.username} onChange={this.onChangeInput} name="username" validateErr={validateErr.username}/>
        <button onClick={this.validateFunc}>Validate</button>
    </ManagerLayout>;
  }
}

export default App;
