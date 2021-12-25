// import React, { useEffect } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useState } from "react";
// import { useHistory } from "react-router";
// import axios from "axios";

// const EditProfile = () => {
//   const [data, setData] = useState([]);
//   const [name, setname] = useState("");
//   const [lastName, setlastName] = useState("");
//   const [email, setemail] = useState("");
//   const history = useHistory();
//   useEffect(() => {
//     const fetchData = async () => {
//       const userId = localStorage.getItem("id");
//       const result = await axios(`http://localhost:2000/api/auth/${userId}`);
//       console.log(result.data, "useerrr");
//       setData(result.data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <section id="cover" class="min-vh-100">
//         <div id="cover-caption" style={{ marginTop: "100px" }}>
//           <div class="container">
//             <div class="row text-white">
//               <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
//                 <div class="px-2">
//                   <Form>
//                     <Form.Group controlId="formBasicEmail">
//                       <Form.Label className="itemlabel">Name</Form.Label>
//                       <Form.Control
//                         className="itemStyle"
//                         type="name"
//                         placeholder={data.name}
//                         name="name"
//                         value={name}
//                         onChange={(e) => setname(e.target.value)}
//                       />
//                     </Form.Group>

//                     <Form.Group controlId="formBasicPassword">
//                       <Form.Label className="itemlabel">lastName</Form.Label>
//                       <Form.Control
//                         type="lastName"
//                         placeholder={data.lastName}
//                         name="lastName"
//                         value={lastName}
//                         className="itemStyle"
//                         onChange={(e) => setlastName(e.target.value)}
//                       />
//                     </Form.Group>

//                     <Form.Group controlId="formBasicPassword">
//                       <Form.Label className="itemlabel">Email</Form.Label>
//                       <Form.Control
//                         type="email"
//                         placeholder={data.email}
//                         name="email"
//                         value={email}
//                         className="itemStyle"
//                         onChange={(e) => setemail(e.target.value)}
//                       />
//                     </Form.Group>
//                     <div
//                       style={{
//                         justifyContent: "space-between",
//                         padding: "5% 14%",
//                       }}
//                     >
//                       <Button
//                         className="buttonStyle"
//                         variant="primary"
//                         type="submit"
//                         style={{ backgroundColor: "#00AAEE" }}
//                         onClick={() =>
//                           //  UpdateUser()
//                           {
//                             const editUser = { name, lastName, email };

//                             console.log(editUser, "editUser");
//                             const userId = localStorage.getItem("id");
//                             axios.put(
//                               `http://localhost:2000/api/auth/${userId}`,
//                               editUser
//                             );
//                             alert("edit user profile with success");
//                           }
//                         }
//                       >
//                         Submit
//                       </Button>
//                     </div>
//                   </Form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default EditProfile;

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import firebase from "../../server/firebase";
import firebase from "../../server/firebase";
// import { Button, Form } from "react-bootstrap";
import store from "../../index";
// import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Menu, Icon, Modal, Button, Form, Segment } from "semantic-ui-react";
const EditProfile = (props) => {
  const [usersState, setUsersState] = useState([]);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [connectedUsersState, setConnectedUsersState] = useState([]);

  const usersRef = firebase.database().ref("users");

  const connectedRef = firebase.database().ref(".info/connected");

  const statusRef = firebase.database().ref("status");
  const [name, setname] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");

  const openModal = () => {
    setModalOpenState(true);
  };

  const closeModal = () => {
    setModalOpenState(false);
  };
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
            <>
              <Menu.Menu style={{ marginTop: "10px" }}>
                <Menu.Item>
                  <span
                    className="clickable"
                    style={{ fontSize: 16 }}
                    onClick={openModal}
                  >
                    <Icon name="edit" /> EditProfile
                  </span>
                </Menu.Item>
              </Menu.Menu>
              <Modal open={modalOpenState} onClose={closeModal}>
                <Modal.Header>EditProfile</Modal.Header>
                <Modal.Content>
                  <Form
                  // onSubmit={onSubmit}
                  >
                    <Segment stacked>
                      <Form.Input
                        name="name"
                        // value={channelAddState.name}
                        // onChange={handleInput}
                        type="text"
                        placeholder={user.displayName}
                        onChange={(e) => setname(e.target.value)}
                      />
                      <Form.Input
                        name="description"
                        value={user.email}
                        // onChange={handleInput}
                        type="text"
                        // placeholder="Email"
                        // placeholder={user.email}
                        onChange={(e) => setemail(e.target.value)}
                        disabled={true}
                      />
                    </Segment>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    // loading={isLoadingState}
                    onClick={() => {
                      const accountStatus = usersRef.child(user.id);

                      accountStatus.update({
                        email: email,
                        displayName: name,
                      });
                    }}
                  >
                    <Icon name="checkmark" /> Save
                  </Button>
                  <Button onClick={closeModal}>
                    <Icon name="remove" /> Cancel
                  </Button>
                </Modal.Actions>
              </Modal>
            </>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
