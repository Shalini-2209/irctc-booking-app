import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { IrctcABI } from "../../storage/IrctcABI";

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  IrctcABI,
  "0xf54e4Fb224f8B602C7D34e38aD3cfaF40c6bf35C"
);

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    getUsers();
    getTrains();
  }, []);

  const getUsers = async (e) => {
    let count = await RemixContract.methods.userCount().call();

    for (let i = 0; i < count; i++) {
      let user = await RemixContract.methods.users(i).call();
      console.log(user);

      setUsers((prev) => [
        ...prev,
        {
          id: user.userId,
          name: user.name,
          email: user.email,
        },
      ]);
    }
  };

  const getTrains = async (e) => {
    let count = await RemixContract.methods.trainCount().call();

    for (let i = 0; i < count; i++) {
      let train = await RemixContract.methods.trains(i).call();
      console.log(train);

      setTrains((prev) => [
        ...prev,
        {
          number: train.trainNo,
          name: train.trainName,
          time: train.time,
          seats: train.seats,
        },
      ]);
    }
  };

  return (
    <div className="container">
      <h1 className="display-5">Trains</h1>
      {/* <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Train Number</th>
            <th scope="col">Train Name</th>
            <th scope="col">Time</th>
            <th scope="col">Seats</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{train.number}</td>
              <td>{train.name}</td>
              <td>{train.time}</td>
              <td>{train.seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
