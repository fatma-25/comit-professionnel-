import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const EditProfile = () => {
  const [data, setData] = useState([]);
  const [name, setname] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("id");
      const result = await axios(`http://localhost:2000/api/auth/${userId}`);
      console.log(result.data, "useerrr");
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <section id="cover" class="min-vh-100">
        <div id="cover-caption" style={{ marginTop: "100px" }}>
          <div class="container">
            <div class="row text-white">
              <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                <div class="px-2">
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label className="itemlabel">Name</Form.Label>
                      <Form.Control
                        className="itemStyle"
                        type="name"
                        placeholder={data.name}
                        name="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label className="itemlabel">lastName</Form.Label>
                      <Form.Control
                        type="lastName"
                        placeholder={data.lastName}
                        name="lastName"
                        value={lastName}
                        className="itemStyle"
                        onChange={(e) => setlastName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label className="itemlabel">Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder={data.email}
                        name="email"
                        value={email}
                        className="itemStyle"
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </Form.Group>
                    <div
                      style={{
                        justifyContent: "space-between",
                        padding: "5% 14%",
                      }}
                    >
                      <Button
                        className="buttonStyle"
                        variant="primary"
                        type="submit"
                        style={{ backgroundColor: "#00AAEE" }}
                        onClick={() =>
                          //  UpdateUser()
                          {
                            const editUser = { name, lastName, email };

                            console.log(editUser, "editUser");
                            const userId = localStorage.getItem("id");
                            axios.put(
                              `http://localhost:2000/api/auth/${userId}`,
                              editUser
                            );
                            alert("edit user profile with success");
                          }
                        }
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
