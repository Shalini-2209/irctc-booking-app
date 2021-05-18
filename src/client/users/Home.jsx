import React, { useState, useContext, useEffect } from "react";
import contract from "../../storage/Contracts";
import { UserContext } from "../../storage/Contexts";
import styles from "../../style/style";
import Loading from "./Loading";
import { Table, Button, Card } from "react-bootstrap";
import NavBar from "./NavBar";

const Home = () => {
  const [trains, setTrains] = useState([]);
  const { data } = useContext(UserContext);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(false);
    getTrains();
  }, []);

  const getTrains = async (e) => {
    let count = await contract.RemixContract.methods.trainCount().call();

    for (let i = 0; i < count; i++) {
      let train = await contract.RemixContract.methods.trains(i).call();
      setTrains((prev) => [
        ...prev,
        {
          number: train.trainNo,
          name: train.trainName,
          time: train.time,
          seats: train.seats,
          src: train.src,
          dest: train.dest,
        },
      ]);
    }
  };

  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <div style={styles.body}>
          <NavBar />
          <div style={styles.homeImg}>
            <Card style={styles.train}>
              <Card.Title>
                {" "}
                <b style={styles.badge}>COVID ALERT : Stay Safe!</b>
              </Card.Title>
              <Card.Body style={styles.form}>
                <ul
                  style={{
                    backgroundColor: "#2f343d",
                    padding: 30,
                    marginTop: -10,
                  }}
                >
                  <li>
                    Wear Mask, Follow Physical Distancing, Maintain Hand Hygine.
                  </li>
                  <li>
                    Get your favourite food at your train seat through
                    e-Catering available at selected stations.
                  </li>{" "}
                  <li>
                    All passengers are hereby informed that downloading of
                    Aarogya Setu App on their mobile phone, that they are
                    carrying along, is advisable.{" "}
                  </li>
                  <li>
                    Though various State Governments' Advisories have been
                    provided on IRCTC Website, Still Users are advised to surf
                    Destination State Government URL/ Website for latest
                    instructions on Covid-19 pandemic and Covid appropriate
                    behaviour.
                  </li>
                  <li>
                    Catering Service is not available and catering charges not
                    included in the fare.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </div>

          {data ? (
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Train Number</th>
                  <th>Train Name</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Seats Available</th>
                  <th>Depature time</th>
                  <th>Book</th>
                </tr>
              </thead>
              <tbody>
                {trains.map((train) => (
                  <tr key={train.number}>
                    <td>{train.number}</td>
                    <td>{train.name}</td>
                    <td>{train.src}</td>
                    <td>{train.dest}</td>
                    <td>{train.seats}</td>
                    <td>{train.time}</td>
                    <td>
                      <Button
                        style={styles.bookBtn}
                        onClick={() => (window.location.href = "/bookTickets")}
                      >
                        Book
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <center style={{ margin: "40vh" }}>LOGIN TO VIEW DETAILS</center>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
