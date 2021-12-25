// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const Contact = ({ searchedName }) => {
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
//           {data
//             .filter(
//               (user) =>
//                 user.name.toLowerCase().indexOf(searchedName) !== -1 ||
//                 user.email.toLowerCase().indexOf(searchedName) !== -1
//             )
//             .map((user) => (
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-around",
//                   alignSelf: "stretch",
//                 }}
//               >
//                 <a>{user.name}</a>
//                 <a>{user.email}</a>
//               </div>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Contact;

import React, { useEffect, useState } from "react";
import axios from "axios";
const Contact = ({ searchedName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:2000/api/auth/all");

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <table className="table">
        <tbody className="table">
          {data
            .filter(
              (user) =>
                user.name.toLowerCase().indexOf(searchedName) !== -1 ||
                user.email.toLowerCase().indexOf(searchedName) !== -1
            )
            .map((user) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignSelf: "stretch",
                }}
              >
                <a>{user.name}</a>
                <a>{user.email}</a>
              </div>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contact;
