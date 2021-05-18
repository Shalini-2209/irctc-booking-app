import { useState, useEffect } from "react";
import contract from "../../../storage/Contracts";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (e) => {
    let count = await contract.RemixContract.methods.userCount().call();

    for (let i = 0; i < count; i++) {
      let user = await contract.RemixContract.methods.users(i).call();
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
