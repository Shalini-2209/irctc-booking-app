import React, { useState, useContext } from "react";
import contract from "../../storage/Contracts";
import { UserContext } from "../../storage/Contexts";
import styles from "../../style/style";
import NavBar from "./NavBar";
import { Form, Button, Card } from "react-bootstrap";

const BookTickets = () => {
  const { data } = useContext(UserContext);

  let initial = {
    trainNo: "",
    name: "",
    age: "",
    date: "",
  };

  const [form, setForm] = useState(initial);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // console.log(form);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    let values = await contract.web.eth.getAccounts();
    const authority = values[0];

    const gas = await contract.RemixContract.methods
      .book(data, form.trainNo, form.date, form.name, form.age)
      .estimateGas();
    const result = await contract.RemixContract.methods
      .book(data, form.trainNo, form.date, form.name, form.age)
      .send({ from: authority, gas });

    setForm(initial);

    if (result) {
      alert("Booking successful");
      window.location.href = "/bookTickets";
    } else alert("Seats unavailable");
  };
  return (
    <>
      <div style={styles.body}>
        <NavBar />
        {data ? (
          <div style={styles.loading}>
            <Card style={styles.card}>
              <Form>
                <h3 style={styles.title}>
                  Book Tickets and enjoy your Journey!
                </h3>
                <Form.Group controlId="formBasicName">
                  <Form.Label style={{ color: "white" }}>
                    Passenger Name
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
                    Date Of Journey
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    placeholder="Enter date of Journey"
                    onChange={handleChange}
                    value={form.date}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label style={{ color: "white" }}>
                    Enter Passenger Age
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    placeholder="Age"
                    onChange={handleChange}
                    value={form.age}
                  />
                </Form.Group>
                <br />

                <Form.Control
                  as="select"
                  custom
                  name="trainNo"
                  onChange={handleChange}
                  style={{
                    width: 500,
                    height: 40,
                    borderRadius: 5,
                  }}
                >
                  <option>Choose...</option>
                  <option value="12607">12607</option>
                  <option value="12580">12580</option>
                  <option value="12700">12700</option>
                </Form.Control>
                <br />
                <Button
                  type="submit"
                  style={styles.submit}
                  onClick={handleBooking}
                >
                  Book Ticket
                </Button>
              </Form>
            </Card>
          </div>
        ) : (
          <center style={{ margin: "40vh" }}>LOGIN TO VIEW DETAILS</center>
        )}
      </div>
    </>
  );
};

export default BookTickets;
