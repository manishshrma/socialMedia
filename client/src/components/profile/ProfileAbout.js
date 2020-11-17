import React, { Component } from "react";
import isEmpty from "../../validations/is-empty";
// issue: unable  to keep the bio field empty. it automatically grabbing the last bio. how?? in editProfile section
class ProfileAbout extends Component {
  state = {};
  render() {
    const { profile } = this.props;
    const firstname = profile.user.name.trim().split(" ")[0];
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" />
        {skill}
      </div>
    ));
    return (
      <div class="row">
        <div class="col-md-12">
          <div class="card card-body bg-light mb-3">
            <h3 class="text-center text-info">{firstname}'s Bio</h3>
            <p class="lead">
              {isEmpty(profile.bio) ? (   
                <span>{firstname} does not have Bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 class="text-center text-info">Skill Set</h3>
            <div class="row">
              <div class="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
