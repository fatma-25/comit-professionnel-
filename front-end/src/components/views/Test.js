// import React, { useEffect } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useState } from "react";
// import axios from "axios";

// const Test = () => {
//   const [data, setData] = useState([]);
//   const [name, setname] = useState("");
//   const [lastName, setlastName] = useState("");
//   const [email, setemail] = useState("");
//   const [text, setText] = useState("");
//   useEffect(() => {
//     const fetchData = async () => {
//       const userId = localStorage.getItem("id");
//       const result = await axios(`http://localhost:2000/api/auth/${userId}`);
//       console.log(result.data, "useerrr");
//       setData(result.data);
//       setname(data.name);
//       setlastName(data.lastName);
//       setemail(data.email);
//     };

//     fetchData();
//   });

//   return (
//     <>
//       <section id="cover" class="min-vh-100">
//         <div id="cover-caption" style={{ marginTop: "100px" }}>
//           <div class="container">
//             <div class="row text-white">
//               <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
//                 <div class="px-2">
//                   <Form>
//                     <Form.Group controlId="formBasicPassword">
//                       <Form.Label className="itemlabel">text</Form.Label>
//                       {/* <Form.Control */}
//                       <textarea
//                         type="text"
//                         name="text"
//                         value={text}
//                         className="itemStyle"
//                         onChange={(e) => setText(e.target.value)}
//                       ></textarea>
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
//                             const editUser = {
//                               name: name,
//                               lastName: lastName,
//                               email: email,
//                               text,
//                             };

//                             console.log(editUser, "editUser");
//                             const userId = localStorage.getItem("id");
//                             axios.put(
//                               `http://localhost:2000/api/auth/${userId}/contact`,
//                               editUser
//                             );
//                             alert("mesg sent with success");
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

// export default Test;

import React, { useEffect } from "react";
// import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Menu, Icon, Modal, Button, Form, Segment } from "semantic-ui-react";
const ContactSupport = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [name, setname] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [text, setText] = useState("");
  const [modalOpenState, setModalOpenState] = useState(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userId = localStorage.getItem("id");
  //     const result = await axios(`http://localhost:2000/api/auth/${userId}`);
  //     console.log(result.data, "useerrr");
  //     setData(result.data);
  //     setname(data.name);
  //     setlastName(data.lastName);
  //     setemail(data.email);
  //   };

  //   fetchData();
  // });
  const openModal = () => {
    setModalOpenState(true);
  };

  const closeModal = () => {
    setModalOpenState(false);
  };
  return (
    // <>
    //   <section id="cover" class="min-vh-100">
    //     <div id="cover-caption" style={{ marginTop: "100px" }}>
    //       <div class="container">
    //         <div class="row text-white">
    //           <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
    //             <div class="px-2">
    //               <Form>
    //                 <Form.Group controlId="formBasicEmail">
    //                   <Form.Label className="itemlabel">Name</Form.Label>
    //                   <Form.Control
    //                     className="itemStyle"
    //                     type="name"
    //                     placeholder="Name"
    //                     name="name"
    //                     value={name}
    //                     onChange={(e) => setname(e.target.value)}
    //                   />
    //                 </Form.Group>

    //                 <Form.Group controlId="formBasicPassword">
    //                   <Form.Label className="itemlabel">lastName</Form.Label>
    //                   <Form.Control
    //                     type="lastName"
    //                     placeholder="lastName"
    //                     name="lastName"
    //                     value={lastName}
    //                     className="itemStyle"
    //                     onChange={(e) => setlastName(e.target.value)}
    //                   />
    //                 </Form.Group>

    //                 <Form.Group controlId="formBasicPassword">
    //                   <Form.Label className="itemlabel">Email</Form.Label>
    //                   <Form.Control
    //                     type="email"
    //                     placeholder="Email"
    //                     name="email"
    //                     value={email}
    //                     className="itemStyle"
    //                     onChange={(e) => setemail(e.target.value)}
    //                   />
    //                 </Form.Group>
    //                 <Form.Group controlId="formBasicPassword">
    //                   <Form.Label className="itemlabel">text</Form.Label>
    //                   {/* <Form.Control */}
    //                   <textarea
    //                     placeholder="Message"
    //                     type="text"
    //                     name="text"
    //                     value={text}
    //                     className="itemStyle mt-4"
    //                     style={{ width: 490 }}
    //                     onChange={(e) => setText(e.target.value)}
    //                   ></textarea>
    //                 </Form.Group>
    //                 <div
    //                   style={{
    //                     justifyContent: "space-between",
    //                     padding: "5% 14%",
    //                   }}
    //                 >
    //                   <Button
    //                     className="buttonStyle"
    //                     variant="primary"
    //                     type="submit"
    //                     style={{ backgroundColor: "#00AAEE" }}
    //                     onClick={() =>
    //                       //  UpdateUser()
    //                       {
    //                         const editUser = {
    //                           name: name,
    //                           lastName: lastName,
    //                           email: email,
    //                           text,
    //                         };

    //                         console.log(editUser, "editUser");
    //                         const userId = localStorage.getItem("id");
    //                         axios.put(
    //                           `http://localhost:2000/api/auth/${userId}/contact`,
    //                           editUser
    //                         );
    //                         alert("mesg sent with success");
    //                       }
    //                     }
    //                   >
    //                     Submit
    //                   </Button>
    //                 </div>
    //               </Form>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </>
    <>
      <Menu.Menu style={{ marginTop: "10px" }}>
        <Menu.Item>
          {/* <span
            className="clickable"
            style={{ fontSize: 16 }}
            onClick={openModal}
          >
            <Icon name="edit" /> EditProfile
          </span> */}
          <span
            className="clickable"
            style={{ fontSize: 16, color: "#1E6FBF" }}
            onClick={openModal}
          >
            Contact Support
          </span>
        </Menu.Item>
      </Menu.Menu>
      <Modal open={modalOpenState} onClose={closeModal}>
        <Modal.Header>Contact Support</Modal.Header>
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
                value={name}
                placeholder="Name"
                onChange={(e) => setname(e.target.value)}
              />
              <Form.Input
                name="email"
                value={email}
                // onChange={handleInput}
                type="text"
                placeholder="Email"
                // placeholder={user.email}
                onChange={(e) => setemail(e.target.value)}
              />
              <Form.Input
                name="description"
                value={text}
                // onChange={handleInput}
                type="text"
                // placeholder="Email"
                // placeholder={user.email}
                placeholder="Message"
                onChange={(e) => setText(e.target.value)}
              />
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            // loading={isLoadingState}
            onClick={() => {
              const editUser = {
                name: name,
                lastName: lastName,
                email: email,
                text,
              };

              console.log(editUser, "editUser");
              const userId = localStorage.getItem("id");
              axios.put(
                `http://localhost:2000/api/auth/${userId}/contact`,
                editUser
              );
              // alert("mesg sent with success");
              // history.push("/login");
              setname("");
              setemail("");
              setText("");
              closeModal();
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
};

export default ContactSupport;
