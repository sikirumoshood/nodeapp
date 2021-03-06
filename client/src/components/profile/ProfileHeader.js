import React, { Component } from "react";
import isEmpty from "../../utils/is-empty";
import PropTypes from "prop-types";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div
            style={{
              boxShadow: "0px 0px 25px #F0F0F2",
              marginBottom: "2%",
              borderStyle: "none"
            }}
            className="card card-body bg-primary text-white mb-3"
          >
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {isEmpty(profile.company) ? (
                  ""
                ) : (
                  <span>at {profile.company}</span>
                )}
              </p>
              <p>{profile.location}</p>
              <p>
                {isEmpty(profile.website) ? (
                  ""
                ) : (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={profile.website}
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? (
                  ""
                ) : (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={profile.social.twitter}
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? (
                  ""
                ) : (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={profile.social.facebook}
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? (
                  ""
                ) : (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={profile.social.linkedin}
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? (
                  ""
                ) : (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={profile.social.instagram}
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileHeader;
