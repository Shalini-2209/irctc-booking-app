import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import styles from "../../style/style";
import contract from "../../storage/Contracts";
import { Link } from "react-router-dom";

const Register = () => {
  contract.web.eth.defaultAccount = contract.web.eth.accounts[0];

  let initial = {
    name: "",
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initial);

  const [cPass, setCPass] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    if (cPass !== form.password) alert("Passphrase mismatch");
    else {
      e.preventDefault();
      let values = await contract.web.eth.getAccounts();
      let index = await contract.RemixContract.methods.addressIndex().call();
      const authority = values[0];

      const gas = await contract.RemixContract.methods
        .register(values[index], form.name, form.email, form.password)
        .estimateGas();
      const result = await contract.RemixContract.methods
        .register(values[index], form.name, form.email, form.password)
        .send({ from: authority, gas });

      // console.log(index);
      console.log(result);

      setForm(initial);
      setCPass("");
      if (window.confirm("Registration successful, Try Loging in!")) {
        window.location.href = "/login";
      }
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#282c34" }}>
        <Container fluid>
          <Row>
            <Col style={styles.form}>
              <Form>
                <h3 style={styles.title}>Welcome to IRCTC DAPP!</h3>
                <Form.Group controlId="formBasicName">
                  <Form.Label style={{ color: "white" }}>User Name</Form.Label>
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

                <div style={styles.login}>
                  <Link to="/login" style={styles.login}>
                    Already have an account? Login?
                  </Link>
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
            <Col
              style={{
                backgroundImage: `url("https://live.staticflickr.com/6151/6163903029_6e7890ccf7_b.jpg")`,
              }}
            ></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Register;
