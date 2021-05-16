import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Web3 from "web3";
import { IrctcABI } from "../storage/IrctcABI";

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  IrctcABI,
  "0xf54e4Fb224f8B602C7D34e38aD3cfaF40c6bf35C"
);

const Login = () => {
  let initial = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initial);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let values = await contract.web.eth.getAccounts();
    const authority = values[0];

    const gas = await contract.RemixContract.methods
      .login(form.email, form.password)
      .estimateGas();
    const result = await contract.RemixContract.methods
      .login(form.email, form.password)
      .send({ from: authority, gas });
    console.log(result);

    setForm(initial);

    alert("Hi");
  };

  return (
    <>
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
                    Enter the mail-Id that you used for registration.
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

                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleLogin}
                  style={styles.submit}
                >
                  Sign In
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const styles = {
  submit: {
    marginTop: 50,
    backgroundColor: "rgb(158, 60, 60)",
  },

  form: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    alignItems: "center",
    marginTop: 100,
  },

  title: { color: "white", textAlign: "center", paddingBottom: 20 },
};

export default Login;
