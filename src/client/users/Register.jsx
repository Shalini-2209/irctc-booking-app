import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import contract from "../../storage/Contracts";

import Login from "../users/Login";

const Register = () => {
  contract.web.eth.defaultAccount = contract.web.eth.accounts[0];

  let initial = {
    name: "",
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initial);

  const [cPass, setCPass] = useState("");
  const [index, setIndex] = useState(1);
  const [login, setLogin] = useState(false);
  const [reg, setReg] = useState(true);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const toggleScreen = () => {
    setReg(!reg);
    setLogin(!login);
  };

  const handleRegister = async (e) => {
    console.log(index);
    if (cPass !== form.password) alert("Passphrase mismatch");
    else {
      e.preventDefault();
      let values = await contract.web.eth.getAccounts();
      const authority = values[0];

      const gas = await contract.RemixContract.methods
        .register(values[index], form.name, form.email, form.password)
        .estimateGas();
      const result = await contract.RemixContract.methods
        .register(values[index], form.name, form.email, form.password)
        .send({ from: authority, gas });
      console.log(result);

      if (index + 1 < values.length) setIndex(index + 1);

      setForm(initial);
      setCPass("");

      alert("Registration successful");
    }
  };

  return (
    <>
      {reg && (
        <div style={{ backgroundColor: "#282c34" }}>
          <Container fluid>
            <Row>
              <Col
                style={{
                  backgroundImage: `url("https://live.staticflickr.com/6151/6163903029_6e7890ccf7_b.jpg")`,
                }}
              ></Col>
              <Col style={styles.form}>
                <Form>
                  <h3 style={styles.title}>Welcome to IRCTC DAPP!</h3>
                  <Form.Group controlId="formBasicName">
                    <Form.Label style={{ color: "white" }}>
                      User Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label style={{ color: "white" }}>
                      Email address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={handleChange}
                      value={form.email}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label style={{ color: "white" }}>
                      Enter Passphrase
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Passphrase"
                      onChange={handleChange}
                      value={form.password}
                    />
                  </Form.Group>

                  <Form.Group controlId="confirmPassword">
                    <Form.Label style={{ color: "white" }}>
                      Confirm Passphrase
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Passphrase"
                      value={cPass}
                      onChange={(e) => setCPass(e.target.value)}
                    />
                  </Form.Group>

                  <div onClick={toggleScreen} style={styles.login}>
                    Already have an account? Login?
                  </div>

                  <Button
                    type="submit"
                    onClick={handleRegister}
                    style={styles.submit}
                  >
                    Sign Up
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      )}
      {login && <Login />}
    </>
  );
};

const styles = {
  submit: {
    marginTop: 30,
    backgroundColor: "rgb(158, 60, 60)",
  },

  form: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    alignItems: "center",
    marginTop: 100,
  },

  login: { color: "rgb(158, 60, 60)", paddingTop: 20 },

  title: { color: "white", textAlign: "center", paddingBottom: 20 },
};

export default Register;
