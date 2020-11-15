import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile,deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    //
    console.log("me running this time!! oh!!");
  }
  
  onDeleteClick(e){
    this.props.deleteAccount();
  }


  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent; let handle;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        handle=profile.handle
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
              <ProfileActions/>
              <Experience experience={profile.experience}/>
              <div style={{marginBottom:'60px'}}/>
              <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
        <h1>{profile.handle}</h1>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p> // global
            state man!!!
            <p>You haven't created profile. Please create profile</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              CreateProfile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile,deleteAccount })(Dashboard);
