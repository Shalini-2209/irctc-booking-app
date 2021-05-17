import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import styles from "../../style/style";
import contract from "../../storage/Contracts";
import { UserContext } from "../../storage/Contexts";

const Login = () => {
  let initial = {
    email: "",
    password: "",
  };

  const { setData } = useContext(UserContext);

  const [form, setForm] = useState(initial);
  const [isLogIn, setIsLogIn] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let result = await contract.RemixContract.methods
      .login(form.email, form.password)
      .call();
    console.log("Boolean:", result);

    if (result) {
      setIsLogIn(result);
      setData(form.email);
      setForm(initial);
    } else {
      alert("Invalid user");
    }
  };

  return (
    <>
      {isLogIn ? (
        <Redirect to="/home" />
      ) : (
        <div style={{ backgroundColor: "#282c34" }}>
          <Container fluid>
            <Row>
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
                  <div style={styles.login}>
                    <Link to="/" style={styles.login}>
                      {" "}
                      Back
                    </Link>
                  </div>

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
              <Col
                style={{
                  backgroundImage: `url("https://live.staticflickr.com/6151/6163903029_6e7890ccf7_b.jpg")`,
                }}
              ></Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default Login;
