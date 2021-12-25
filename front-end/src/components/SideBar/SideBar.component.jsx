// import React from 'react';
// import { Menu } from 'semantic-ui-react';
// import UserInfo from "./UserInfo/UserInfo.component";
// import Channels from "./Channels/Channels.component";
// import PrivateChat from "./PrivateChat/PrivateChat.component";
// import FavouriteChannels from "./FavouriteChannels/FavouriteChannels.component";
// import { Link, useHistory } from "react-router-dom";
// // import { Nav, Navbar, Container, Button } from "react-bootstrap";
// import "./SideBar.css";

// export const SideBar = () => {
//     return (<Menu vertical fixed="left" borderless size="large" className="side_bar">
//         <UserInfo />
//         <FavouriteChannels />
//         <Channels /> 
//         <PrivateChat />
//   <div style={{display:"flex", flexDirection:"column"}}>
//         <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/calendar"
//               >
//                Calendar
//               </Link>
//               <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/listcontact"
//               >
//                 List Contact
//               </Link>
//               <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/upload"
//               >
//                 Upload
//               </Link>
//               <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/shared"
//               >
//                 Shared Document
//               </Link>
//               <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/edit"
//               >
//                 Edit Profile
//               </Link>
//               <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/ApprouveUser"
//               >
//                 ApprouveUser
//               </Link>
//    </div>
//     </Menu>
//     )
// }






import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import firebase from "../../server/firebase";
import firebase from "../../server/firebase";

import {Menu, Icon, } from 'semantic-ui-react'
import UserInfo from "./UserInfo/UserInfo.component";
import Channels from "./Channels/Channels.component";
import PrivateChat from "./PrivateChat/PrivateChat.component";
import FavouriteChannels from "./FavouriteChannels/FavouriteChannels.component";
import { Link, useHistory } from "react-router-dom";
import store from '../../index'

import "./SideBar.css";
import EditProfile from "../views/EditProfile";

export const SideBar = (props) => {
  const [usersState, setUsersState] = useState([]);

  const [connectedUsersState, setConnectedUsersState] = useState([]);

  const usersRef = firebase.database().ref("users");

  const connectedRef = firebase.database().ref(".info/connected");

  const statusRef = firebase.database().ref("status");

  useEffect(() => {
    usersRef.on("child_added", (snap) => {
      setUsersState((currentState) => {
        let updatedState = [...currentState];

        let user = snap.val();
        user.name = user.displayName;
        user.email = user.email;
        user.status = user.status;
        user.id = snap.key;
        user.isPrivateChat = true;
        updatedState.push(user);

        return updatedState;
      });
    });

    connectedRef.on("value", (snap) => {
      if (props.user && snap.val()) {
        const userStatusRef = statusRef.child(props.user.uid);
        userStatusRef.set(true);
        userStatusRef.onDisconnect().remove();
      }
    });

    return () => {
      usersRef.off();
      connectedRef.off();
    };
  }, [props.user]);

  useEffect(() => {
    statusRef.on("child_added", (snap) => {
      setConnectedUsersState((currentState) => {
        let updatedState = [...currentState];
        updatedState.push(snap.key);
        return updatedState;
      });
    });

    statusRef.on("child_removed", (snap) => {
      setConnectedUsersState((currentState) => {
        let updatedState = [...currentState];

        let index = updatedState.indexOf(snap.key);
        updatedState.splice(index, 1);
        return updatedState;
      });
    });

    return () => statusRef.off();
  }, [usersState]);

  const displayUser = () => {
    if (usersState.length > 0) {
      return usersState
        .filter((user) => user.id === store.getState().user.currentUser.uid)
        .map((user) => {
          return (
            user.status === false ?

            <Menu vertical fixed="left" borderless size="large" className="side_bar">
               
            <UserInfo />
            </Menu>

: 

    (   <Menu vertical fixed="left" borderless size="large" className="side_bar">
               
        <UserInfo />
        {/* <FavouriteChannels /> */}




       {/* <Channels />  */}
        <PrivateChat />
        <EditProfile />
        {console.log(user.status,"ppppp")}
  <div style={{display:"flex", flexDirection:"column"}}>
  <Menu.Item style={{ fontSize: '17px' }}>
             <Link
                style={{ color: "#B4B4B9", textDecoration: "none" }}
                to="/calendar"
              >
               <Icon name="calendar" />   Calendar
              </Link>
    
        </Menu.Item>
        <Menu.Item style={{ fontSize: '17px' }}>
             <Link
                style={{ color: "#B4B4B9", textDecoration: "none" }}
                to="/listcontact"
              >
               <Icon name="list" />    List Contact
              </Link>
    
        </Menu.Item>
        <Menu.Item style={{ fontSize: '17px' }}>
             <Link
                style={{ color: "#B4B4B9", textDecoration: "none" }}
                to="/upload"
              >
               <Icon name="upload" />      Upload
              </Link>
    
        </Menu.Item>
        <Menu.Item style={{ fontSize: '17px' }}>
             <Link
                style={{ color: "#B4B4B9", textDecoration: "none" }}
                to="/shared"
              >
               <Icon name="share" />          Shared Document
              </Link>
    
        </Menu.Item>
   
        {/* <Menu.Item style={{ fontSize: '17px' }}>
             <Link
                style={{ color: "#B4B4B9", textDecoration: "none" }}
                to="/edit"
              >
               <Icon name="edit" />           Edit Profile
              </Link>
    
        </Menu.Item> */}
   

        { user.account === "admin" && 
           <Menu.Item style={{ fontSize: '17px' }}>
           <Link
              style={{ color: "#B4B4B9", textDecoration: "none" }}
              to="/ApprouveUser"
            >
             <Icon name="edit" />          ApprouveUser
            </Link>
  
      </Menu.Item>
              } 



        {/* <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/calendar"
              >
               Calendar
              </Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/listcontact"
              >
                List Contact
              </Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/upload"
              >
                Upload
              </Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/shared"
              >
                Shared Document
              </Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/edit"
              >
                Edit Profile
              </Link>

             { user.account === "admin" && <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/ApprouveUser"
              >
                ApprouveUser
              </Link>
              } */}

              <div>{console.log(store.getState().user.currentUser,'sttoore')}</div>
   </div>
    </Menu>)
          );
        });
    }
  };

  return <div>{displayUser()}</div>;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // selectChannel: (channel) => dispatch(setChannel(channel)),
  };
};

connect(mapStateToProps, mapDispatchToProps)(SideBar);
