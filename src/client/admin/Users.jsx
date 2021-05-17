import { useState, useEffect } from "react";
import Web3 from "web3";
import { IrctcABI } from "../../storage/IrctcABI";

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  IrctcABI,
  "0xD5Ef5e729ACba9462359B52925f85A49Aca2ea0c"
);

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (e) => {
    let count = await RemixContract.methods.userCount().call();

    for (let i = 0; i < count; i++) {
      let user = await RemixContract.methods.users(i).call();
      // console.log(user);

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

  return (
    <div className="container">
      <h1 className="display-5">Users</h1>
      <table className="table">
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
      </table>
    </div>
  );
};

export default Users;
