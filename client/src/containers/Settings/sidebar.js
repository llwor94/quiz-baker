import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import server from "../../utils/server";
import { getUser } from "../../store/actions/authActions";
import ImageUpload from "../ImageUpload";
import Button from "../../components/Styles/Button";
import { LargeImage } from "../../components/Styles/Image";
import UpdateUsername from "./updateUsername";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
`;


const Sidebar = ({ user, getUser, ...props }) => {
  const [imageUpdate, setImageUpdate] = useState(false);

  useEffect(() => {
    getUser(user.id);
  }, []);
  if (imageUpdate)
    return (
      <ImageUpload doneEditting={() => setImageUpdate(false)} {...props}>
        <Button
		secondary
          icon="pi pi-arrow-left"
          label="back"
          onClick={() => setImageUpdate(false)}
        />
      </ImageUpload>
    );
  else
    return (
      <ProfileWrapper>
        <LargeImage src={user.img_url} />
        <h4>Welcome, {user.username}!</h4>
        <div style={{display: "flex"}}>
        <Button secondary label="Update Image?" onClick={() => setImageUpdate(true)} />

        <UpdateUsername />
        </div>
      </ProfileWrapper>
    );
};

const mapStateToProps = ({ authReducer }) => ({
  user: authReducer.user
});

export default connect(
  mapStateToProps,
  { getUser }
)(Sidebar);
