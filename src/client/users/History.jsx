import React, { useState, useEffect, useContext } from "react";
import styles from "../../style/style";
import contract from "../../storage/Contracts";
import NavBar from "./NavBar";
import { UserContext } from "../../storage/Contexts";
import { Table, Button } from "react-bootstrap";

const History = () => {
  const [history, setHistory] = useState([]);
  const { data } = useContext(UserContext);

  useEffect(() => {
    getSummary();
  }, []);

  const getSummary = async () => {
    let count = await contract.RemixContract.methods.passengerCount().call();

    for (let i = 0; i < count; i++) {
      let user = await contract.RemixContract.methods.passengers(i).call();

      if (data === user.email) {
        setHistory((prev) => [
          ...prev,
          {
            email: user.email,
            trainNo: user.trainNo,
            date: user.date,
            age: user.age,
            status: user.status,
            pid: user.passengerNo,
          },
        ]);
      }
    }
  };

  const handleCancel = async (pid) => {
    let values = await contract.web.eth.getAccounts();
    const authority = values[0];
    let cancel = await contract.RemixContract.methods
      .cancel(pid)
      .send({ from: authority });
    window.location.href = window.location.href;
    console.log(cancel);
  };

  return (
    <>
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
                <th>Passenger Id</th>
                <th>Date of Journey</th>
                <th>Age</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((user) => (
                <tr key={user.pid}>
                  <td>{user.trainNo}</td>
                  <td>{user.pid}</td>
                  <td>{user.date}</td>
                  <td>{user.age}</td>
                  <td>{user.status}</td>
                  <td>
                    <Button
                      style={styles.bookBtn}
                      onClick={() => handleCancel(user.pid)}
                    >
                      Cancel
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
    </>
  );
};

export default History;
