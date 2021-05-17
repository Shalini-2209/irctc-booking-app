import { useState, useEffect } from "react";
import Web3 from "web3";
import { IrctcABI } from "../../storage/IrctcABI";

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  IrctcABI,
  "0xD5Ef5e729ACba9462359B52925f85A49Aca2ea0c"
);

const Trains = () => {
  let initial = {
    trainNo: "",
    name: "",
    src: "",
    dest: "",
    time: "",
    seats: "",
  };

  const [trains, setTrains] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initial);
  const [isUpdate, setIsUpdate] = useState(false);
  const [filter, setFilter] = useState([]);
  const [isFound, setIsFound] = useState(false);

  useEffect(() => {
    getTrains();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Read
  const getTrains = async (e) => {
    setTrains([]);
    let count = await RemixContract.methods.trainCount().call();

    for (let i = 0; i < count; i++) {
      let train = await RemixContract.methods.trains(i).call();
      // console.log(train);

      if (train.trainNo != 0) {
        setTrains((prev) => [
          ...prev,
          {
            trainNo: train.trainNo,
            name: train.trainName,
            src: train.src,
            dest: train.dest,
            time: train.time,
            seats: train.seats,
          },
        ]);
      }
    }
  };

  // Add
  const addTrain = async (e) => {
    e.preventDefault();

    try {
      let values = await web3.eth.getAccounts();
      const authority = values[0];

      let addMethod = RemixContract.methods.addTrain(
        form.trainNo,
        form.name,
        form.src,
        form.dest,
        form.time,
        form.seats
      );

      let gasEstimate = await addMethod.estimateGas();
      console.log(gasEstimate);
      const result = await addMethod.send({
        from: authority,
        gas: gasEstimate,
      });
      // console.log(result);

      setTrains((prev) => [
        ...prev,
        {
          trainNo: form.trainNo,
          name: form.name,
          src: form.src,
          dest: form.dest,
          time: form.time,
          seats: form.seats,
        },
      ]);

      setForm(initial);
    } catch (e) {
      console.log(e);
      alert("Problem inserting train");
    }
  };

  const prepopulateData = (val) => {
    setShowForm(!showForm);
    let tempTrain = trains.filter((train) => train.trainNo === val);
    setForm(tempTrain[0]);
    setIsUpdate(true);
  };

  // Update
  const editTrain = async (e) => {
    e.preventDefault();
    try {
      let values = await web3.eth.getAccounts();
      const authority = values[0];
      let updateMethod = RemixContract.methods.updateTrain(
        form.trainNo,
        form.name,
        form.src,
        form.dest,
        form.time,
        form.seats
      );

      let gasEstimate = await updateMethod.estimateGas();
      const result = await updateMethod.send({
        from: authority,
        gas: gasEstimate,
      });
      // console.log(result);

      let updatedTrains = [];
      trains.map((train) =>
        train.trainNo === form.trainNo
          ? updatedTrains.push(form)
          : updatedTrains.push(train)
      );

      setTrains(updatedTrains);
      setForm(initial);
      setIsUpdate(false);
      setShowForm(!showForm);
    } catch (e) {
      console.log(e);
      alert("Problem updating train");
    }
  };

  // Delete
  const removeTrain = async (val) => {
    let values = await web3.eth.getAccounts();
    const authority = values[0];
    const gas = await RemixContract.methods.deleteTrain(val).estimateGas();
    const response = await RemixContract.methods
      .deleteTrain(val)
      .send({ from: authority, gas });

    setTrains(trains.filter((train) => train.trainNo !== val));
    // console.log(response);
  };

  // Search
  const filterItems = (e) => {
    let value = e.target.value.toLowerCase();
    let temp = trains.filter(
      (train) => train.name.toLowerCase().indexOf(value) !== -1
    );
    if (temp.length !== 0) {
      setFilter(temp);
      setIsFound(true);
    } else {
      setIsFound(false);
      alert("No trains found");
    }
    // console.log(temp);
  };

  return (
    <div className="container">
      <h1 className="display-5">Trains</h1>

      <input
        type="text"
        className="form-control"
        placeholder="Train name"
        onChange={filterItems}
      />

      <button className="btn btn-primary my-3 " onClick={toggleForm}>
        Add Train
      </button>

      {showForm && (
        <form onSubmit={isUpdate ? editTrain : addTrain}>
          <div className="my-3">
            <input
              type="text"
              className="form-control"
              placeholder="Train Number"
              name="trainNo"
              onChange={handleChange}
              value={form.trainNo}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Train Name"
              name="name"
              onChange={handleChange}
              value={form.name}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Source"
              name="src"
              onChange={handleChange}
              value={form.src}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Destination"
              name="dest"
              onChange={handleChange}
              value={form.dest}
            />
          </div>
          <div className="mb-3">
            <input
              type="time"
              className="form-control"
              placeholder="Time of Departure"
              name="time"
              onChange={handleChange}
              value={form.time}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Number of Seats"
              name="seats"
              onChange={handleChange}
              value={form.seats}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Train No</th>
            <th scope="col">Train Name</th>
            <th scope="col">Time</th>
            <th scope="col">Source</th>
            <th scope="col">Destination</th>
            <th scope="col">Seats</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {isFound ? (
          <tbody>
            {filter.map((train, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{train.trainNo}</td>
                <td>{train.name}</td>
                <td>{train.time} Hr</td>
                <td>{train.src}</td>
                <td>{train.dest}</td>
                <td>{train.seats}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => prepopulateData(train.trainNo)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeTrain(train.trainNo)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {trains.map((train, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{train.trainNo}</td>
                <td>{train.name}</td>
                <td>{train.time} Hr</td>
                <td>{train.src}</td>
                <td>{train.dest}</td>
                <td>{train.seats}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => prepopulateData(train.trainNo)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeTrain(train.trainNo)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Trains;
