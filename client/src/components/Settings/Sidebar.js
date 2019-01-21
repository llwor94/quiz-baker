import React, { useEffect, useState, useContext } from "react";

import server from "../../utils/server";
import { LargeImage } from "../../Styles/Components/Image";
import { Button, SettingsButton } from "../../Styles/Components/Button";
import {
  ProfileWrapper,
  ProfileButtonWrapper,
  ButtonCollapse
} from "../../Styles/Settings/Sidebar";
import { UserCtx } from "../../App";
import { Transition } from "react-transition-group";

import anime from "animejs";

import UpdateImage from "./UpdateImage";
import UpdateUsername from "./updateUsername";

const animateButtonsOut = buttons =>
  anime({ targets: buttons, opacity: 1, translateX: 0 });

const animateButtonsIn = buttons =>
  anime({ targets: buttons, opacity: 0, translateX: 290 });

const Sidebar = () => {
  const [imageUpdate, setImageUpdate] = useState(false);
  const [usernameUpdate, setUsernameUpdate] = useState(false);
  const [img_url, setImg] = useState(null);
  const [user, setUser] = useContext(UserCtx);

  const [buttonsHiding, setButtonsShowing] = useState(false);

  useEffect(() => {
    if (user.img_url) {
      setImg(user.img_url);
    }
  }, []);

  const updateUser = () => {
    let userData = JSON.parse(localStorage.getItem("user"));
    server.get(`/users/${user.id}`).then(({ data }) => {
      let newUser = { ...userData, user: data };
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(data);
      setUsernameUpdate(false);
      setImageUpdate(false);
    });
  };
  return (
    <ProfileWrapper>
      <Transition
        in={buttonsHiding}
        appear
        onEnter={animateButtonsIn}
        onExit={animateButtonsOut}
      >
        <ProfileButtonWrapper display={buttonsHiding}>
          {!usernameUpdate && (
            <UpdateImage
              imageUpdate={imageUpdate}
              appear
              setImageUpdate={setImageUpdate}
              updateUser={updateUser}
            />
          )}
          {!imageUpdate && (
            <UpdateUsername
              usernameUpdate={usernameUpdate}
              setUsernameUpdate={setUsernameUpdate}
              updateUser={updateUser}
            />
          )}
        </ProfileButtonWrapper>
      </Transition>

      <Button
        icon={buttonsHiding ? "pi pi-times" : "pi pi-pencil"}
        onClick={() => setButtonsShowing(!buttonsHiding)}
      />
      <div>
        <LargeImage src={user.img_url} />
        <h4>{user.username}</h4>
      </div>
    </ProfileWrapper>
  );
};

export default Sidebar;
