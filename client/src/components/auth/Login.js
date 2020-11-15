import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { object } from "@hapi/joi";
import errorReducer from "../../reducers/errorReducer";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
componentDidMount()
{
  console.log("component did mount step 1");
  if(this.props.auth.isAuthenticated)
  {
    this.props.history.push('/dashboard');
  }
}
  componentWillReceiveProps(nextprops)
  {
    console.log("comp receive(props) on error step 4 ");
    if(nextprops.auth.isAuthenticated)
    {
      console.log("sucess of comp did mount");

      this.props.history.push("/dashboard");
    }
    if(nextprops.errors)
    {
      console.log(nextprops.errors===false);
      console.log("error of comp did mount",nextprops.errors);

      this.setState({errors:nextprops.errors})
    }

    console.log(nextprops);

    console.log("this running ");
  }

  onSubmit(e) {
    e.preventDefault();

    console.log("on submit step 3");
    
    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(newUser);
  }

  onChange(e) {
    console.log("Again");
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    console.log("render step 2");
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
               <TextFieldGroup

               placeholder="Email Address"
               name="email"
               type="email"
               value={this.state.email}
               onChange={this.onChange}
               error={errors.email}
               />
              

               <TextFieldGroup

               placeholder="password"
               name="password"
               type="password"
               value={this.state.password}
               onChange={this.onChange}
               error={errors.password}
               />

               <input type="submit" className="btn btn-info btn-block mt-4"/>
        
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);

////////////
// step 1: render
// step 2: on typing in field value, it grabbed run onchange method and setstate (which is componenet state for rendering)
// step 3: on clicking the sunbmitting buttton, on submit method run which take the fields data from now updated state,
// and pass and store in user object, which get passed along with loginuser action method.
// step 4: login user action method call axios and make backend call to /api/users/login, get error(in fields not filled correclty)
// otherwise it get data from the action methods and store that data in db., in case error it call error errorReducer, which further set 
// the redux state(global state). and then back on login component, it call component did recieve props,
// which get called every time there is change in state. and once state changed,  it call render again and error get Visible on page