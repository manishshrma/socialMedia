import React, { Component } from "react";
import isEmpty from "../../validations/is-empty";
import ProfileActions from "../dashboard/ProfileActions";
import PropTypes from "prop-types";
// issue: unable  to keep the bio field empty. it automatically grabbing the last bio. how?? in editProfile section
class ProfileAbout extends Component {
  state = {};
  render() {
    const { profile } = this.props;
    const firstname = profile.user.name.trim().split(" ")[0];
    const skills = profile.skills.map((skill, index) => (
      <div key={index} classNameName="p-3">
        <i classNameName="fa fa-check" />
        {skill}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstname}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (   
                <span>{firstname} does not have Bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ProfileAbout.propTypes={
  profile:PropTypes.object.isRequired
}

export default ProfileAbout;
