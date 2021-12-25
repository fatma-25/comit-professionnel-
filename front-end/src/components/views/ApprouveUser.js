// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ApprouveUser = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios("http://localhost:2000/api/auth/all");

//       setData(result.data);
//     };

//     fetchData();
//   }, []);
//   return (
//     <div>
//       <table className="table">
//         <tbody className="table">
//           {data.map((user) => (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-around",
//                 alignSelf: "stretch",
//               }}
//             >
//               <a style={user?.account === "true" ? { color: "red" } : null}>
//                 {user._id}
//               </a>
//               <a style={user?.account === "true" ? { color: "red" } : null}>
//                 {user.name}
//               </a>
//               <a style={user?.account === "true" ? { color: "red" } : null}>
//                 {user.email}
//               </a>
//               {/* <a style={{ color: "red" }}>{user.account}</a> */}
//               <button
//                 type="button"
//                 class="btn btn-link"
//                 onClick={() => {
//                   alert(` user approved`);
//                   axios.put(`http://localhost:2000/api/auth/${user._id}`, {
//                     account: true,
//                   });
//                 }}
//               >
//                 approuve user
//               </button>
//             </div>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ApprouveUser;

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import firebase from "../../server/firebase";
import firebase from "../../server/firebase";

const ApprouveUser = (props) => {
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

  const displayUsers = () => {
    if (usersState.length > 0) {
      return usersState
        .filter((user) => user.id !== props.user.uid)
        .map((user) => {
          return (
            // <div
            //   style={{
            //     display: "flex",
            //     justifyContent: "space-around",
            //     marginBottom: 20,
            //   }}
            // >
            //   <div>
            //     {console.log(user, "uuuuusre")}
            //     {user.name}
            //   </div>
            //   <div>
            //     {/* {user.name}@SoftCommunity.com */}
            //     {user.email}
            //   </div>
            //   <button
            //     type="button"
            //     class="btn btn-link"
            //     onClick={() => {
            //       alert(` user approved`);

            //       const accountStatus = usersRef.child(user.id);

            //       accountStatus.update({ status: true });
            //       // axios.put(`http://localhost:2000/api/auth/${user._id}`, {
            //       //   account: true,
            //       // });
            //     }}
            //   >
            //     approuve user
            //   </button>
            // </div>

            <ul class="list-group" style={{ marginLeft: 100 }}>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <a style={user.status === true ? { color: "red" } : null}>
                  {user.email}
                </a>
                <span class="badge badge-primary badge-pill">
                  {user.status === false ? (
                    <button
                      type="button"
                      class="btn btn-link"
                      onClick={() => {
                        alert(` user approved`);

                        const accountStatus = usersRef.child(user.id);

                        accountStatus.update({ status: true });
                        // axios.put(`http://localhost:2000/api/auth/${user._id}`, {
                        //   account: true,
                        // });
                      }}
                    >
                      Approuve User
                    </button>
                  ) : (
                    <button
                      type="button"
                      class="btn btn-white"
                      onClick={() => {
                        alert(` Active User`);
                      }}
                    >
                      <a style={{ color: "red", textDecoration: "none" }}>
                        Active User
                      </a>
                    </button>
                  )}
                </span>
              </li>
            </ul>
          );
        });
    }
  };

  return <div style={{ marginTop: 100 }}>{displayUsers()}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(ApprouveUser);
