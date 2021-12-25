// import React, { useState } from "react";

// import Search from "../Search";
// import Contact from "./Contact";
// const ListContact = () => {
//   const [searchedName, setSearchedName] = useState("");

//   const searcheditem = (search) => {
//     setSearchedName(search);
//     console.log(searchedName);
//   };
//   return (
//     <>
//       <Search searcheditem={searcheditem} />

//       <Contact searchedName={searchedName} />
//     </>
//   );
// };

// export default ListContact;

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import firebase from "../../server/firebase";
import firebase from "../../server/firebase";
import { Lookup, DropDownOptions } from "devextreme-react/lookup";
import List from "devextreme-react/list";
function Item({ Picture, Prefix, FirstName, LastName }) {
  return (
    <div className="custom-item">
      <img src={Picture} />
      <div>{`${FirstName} ${LastName}`}</div>
    </div>
  );
}
const searchExpression = ["FirstName", "LastName", "Prefix"];
const ListContact = (props) => {
  // function Item({ Picture, Prefix, FirstName, LastName }) {
  //   // usersState
  //   //   .filter((user) => user.id !== props.user.uid)
  //   //   .map((user) => {
  //   <div className="custom-item">
  //     <img src={props.user.photoURL} />
  //     <div>{`${props.user.photoURL} ${Prefix} ${Prefix}`}</div>
  //   </div>;
  //   // });
  // }
  const [usersState, setUsersState] = useState([]);

  const [connectedUsersState, setConnectedUsersState] = useState([]);

  const usersRef = firebase.database().ref("users");

  const connectedRef = firebase.database().ref(".info/connected");

  const statusRef = firebase.database().ref("status");

  useEffect(() => {
    usersRef.on("child_added", (snap) => {
      setUsersState((currentState) => {
        let updatedState = [...currentState];

        // let user = snap.val();
        // user.name = user.displayName;
        // user.email = user.email;
        // user.id = snap.key;
        // user.isPrivateChat = true;
        // updatedState.push(user);
        let user = snap.val();
        user.FirstName = user.displayName;
        user.LastName = user.email;
        user.id = snap.key;
        user.Picture = user.photoURL;
        // user.isPrivateChat = true;
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

  const getDisplayExpr = (item) => {
    // return item ? `${item.FirstName} ${item.LastName}` : "";
    return "Search for employee details";
  };

  const displayUsers = () => {
    if (usersState.length > 0) {
      // return usersState;
      // .filter((user) => user.id !== props.user.uid)
      // .map((user) => {
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
        // </div>

        <div className="dx-fieldset">
          <div className="dx-fieldset-header">List Employee</div>
          <div className="dx-field">
            <Lookup
              items={usersState}
              displayExpr={getDisplayExpr}
              searchExpr={searchExpression}
              valueExpr="ID"
              placeholder="Select employee"
              itemRender={Item}
            >
              <DropDownOptions title="Select employee" />
            </Lookup>
          </div>
        </div>
      );
      // });
    }
  };

  // const selectUser = (user) => {
  //   let userTemp = { ...user };
  //   userTemp.id = generateChannelId(user.id);
  //   setLastVisited(props.user, props.channel);
  //   setLastVisited(props.user, userTemp);
  //   props.selectChannel(userTemp);
  // };

  // const setLastVisited = (user, channel) => {
  //   const lastVisited = usersRef
  //     .child(user.uid)
  //     .child("lastVisited")
  //     .child(channel.id);
  //   lastVisited.set(firebase.database.ServerValue.TIMESTAMP);
  //   lastVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  // };

  // const generateChannelId = (userId) => {
  //   if (props.user.uid < userId) {
  //     return props.user.uid + userId;
  //   } else {
  //     return userId + props.user.uid;
  //   }
  // };

  return <div>{displayUsers()}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(ListContact);

// import React from "react";
// import { Lookup, DropDownOptions } from "devextreme-react/lookup";

// // import { employees } from "./data.js";
// // import Field from "./Field.js";
// // import Item from "./Item.js";

// function Item({ Picture, Prefix, FirstName, LastName }) {
//   return (
//     <div className="custom-item">
//       <img src={Picture} />
//       <div>{`${Prefix} ${FirstName} ${LastName}`}</div>
//     </div>
//   );
// }
// const searchExpression = ["FirstName", "LastName", "Prefix"];
const employees = [
  {
    ID: 1,
    FirstName: "John",
    LastName: "Heart",
    Prefix: "Mr.",
    Position: "CEO",
    Picture: "images/employees/01.png",
    BirthDate: "1964/03/16",
    HireDate: "1995/01/15",
    Notes:
      "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
    Address: "351 S Hill St.",
  },
  {
    ID: 2,
    FirstName: "Olivia",
    LastName: "Peyton",
    Prefix: "Mrs.",
    Position: "Sales Assistant",
    Picture: "images/employees/09.png",
    BirthDate: "1981/06/03",
    HireDate: "2012/05/14",
    Notes:
      "Olivia loves to sell. She has been selling DevAV products since 2012. \r\n\r\nOlivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.",
    Address: "807 W Paseo Del Mar",
  },
  {
    ID: 3,
    FirstName: "Robert",
    LastName: "Reagan",
    Prefix: "Mr.",
    Position: "CMO",
    Picture: "images/employees/03.png",
    BirthDate: "1974/09/07",
    HireDate: "2002/11/08",
    Notes:
      "Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team.\r\n\r\nRobert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.",
    Address: "4 Westmoreland Pl.",
  },
  {
    ID: 4,
    FirstName: "Greta",
    LastName: "Sims",
    Prefix: "Ms.",
    Position: "HR Manager",
    Picture: "images/employees/04.png",
    BirthDate: "1977/11/22",
    HireDate: "1998/04/23",
    Notes:
      "Greta has been DevAV's HR Manager since 2003. She joined DevAV from Sonee Corp.\r\n\r\nGreta is currently training for the NYC marathon. Her best marathon time is 4 hours. Go Greta.",
    Address: "1700 S Grandview Dr.",
  },
  {
    ID: 5,
    FirstName: "Brett",
    LastName: "Wade",
    Prefix: "Mr.",
    Position: "IT Manager",
    Picture: "images/employees/05.png",
    BirthDate: "1968/12/01",
    HireDate: "2009/03/06",
    Notes:
      "Brett came to DevAv from Microsoft and has led our IT department since 2012.\r\n\r\nWhen he is not working hard for DevAV, he coaches Little League (he was a high school pitcher).",
    Address: "1120 Old Mill Rd.",
  },
  {
    ID: 6,
    FirstName: "Sandra",
    LastName: "Johnson",
    Prefix: "Mrs.",
    Position: "Controller",
    Picture: "images/employees/06.png",
    BirthDate: "1974/11/15",
    HireDate: "2005/05/11",
    Notes:
      "Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you've not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.",
    Address: "4600 N Virginia Rd.",
  },
  {
    ID: 7,
    FirstName: "Kevin",
    LastName: "Carter",
    Prefix: "Mr.",
    Position: "Shipping Manager",
    Picture: "images/employees/07.png",
    BirthDate: "1978/01/09",
    HireDate: "2009/08/11",
    Notes:
      "Kevin is our hard-working shipping manager and has been helping that department work like clockwork for 18 months.\r\n\r\nWhen not in the office, he is usually on the basketball court playing pick-up games.",
    Address: "424 N Main St.",
  },
  {
    ID: 8,
    FirstName: "Cynthia",
    LastName: "Stanwick",
    Prefix: "Ms.",
    Position: "HR Assistant",
    Picture: "images/employees/08.png",
    BirthDate: "1985/06/05",
    HireDate: "2008/03/24",
    Notes:
      "Cindy joined us in 2008 and has been in the HR department for 2 years. \r\n\r\nShe was recently awarded employee of the month. Way to go Cindy!",
    Address: "2211 Bonita Dr.",
  },
  {
    ID: 9,
    FirstName: "Kent",
    LastName: "Samuelson",
    Prefix: "Dr.",
    Position: "Ombudsman",
    Picture: "images/employees/02.png",
    BirthDate: "1972/09/11",
    HireDate: "2009/04/22",
    Notes:
      "As our ombudsman, Kent is on the front-lines solving customer problems and helping our partners address issues out in the field.    He is a classically trained musician and is a member of the Chamber Orchestra.",
    Address: "12100 Mora Dr",
  },
];

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <div className="dx-fieldset">
//           <div className="dx-fieldset-header">Custom Item Template</div>
//           <div className="dx-field">
//             <Lookup
//               items={employees}
//               displayExpr={this.getDisplayExpr}
//               searchExpr={searchExpression}
//               valueExpr="ID"
//               placeholder="Select employee"
//               itemRender={Item}
//             >
//               <DropDownOptions title="Select employee" />
//             </Lookup>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   getDisplayExpr(item) {
//     return item ? `${item.FirstName} ${item.LastName}` : "";
//   }
// }

// export default App;
