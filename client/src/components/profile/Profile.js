import React, { Component } from "react";
import ProfileAbout from "./ProfileAbout";
import ProfileCred from "./ProfileCred";
import ProfileGithub from "./ProfileGithub";
import ProfileHeader from "./ProfileHeader";
import Preloader from "../common/Preloader";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getProfileByHandle } from "../../actions/profileActions";
class Profile extends Component {
  render() {
    let profileContent;

    const { profile, loading } = this.props.profile;

    if (profile === null || loading === true) {
      profileContent = <Preloader />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader />
          <ProfileAbout />
          <ProfileCred />
          <ProfileGithub />
          <Preloader />
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.match.params.handle) {
      console.log("Handle: " + this.props.match.params.handle);
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
