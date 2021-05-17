import React, { useState, useContext, useEffect } from "react";
import contract from "../../storage/Contracts";
import { UserContext } from "../../storage/Contexts";
import styles from "../../style/style";
import Loading from "./Loading";
import { Table, Button } from "react-bootstrap";
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
          {data ? (
            <Table
              striped
              bordered
              hover
              variant="dark"
              style={{ marginTop: 70 }}
            >
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
                      <Button style={styles.bookBtn}>Book</Button>
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
