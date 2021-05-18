import { useState, useEffect } from "react";
import contract from "../../storage/Contracts";
import DisplayTrains from "./DisplayTrains";
import SearchTrain from "./SearchTrain";
import TrainButton from "./TrainButton";
import TrainForm from "./TrainForm";

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
  const [authority, setAuthority] = useState("");

  useEffect(() => {
    getAuthority();
    getTrains();
  }, []);

  const getAuthority = async () => {
    let values = await contract.web.eth.getAccounts();
    setAuthority(values[0]);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // pre-populate data for update
  const prepopulateData = (val) => {
    setShowForm(!showForm);
    let tempTrain = trains.filter((train) => train.trainNo === val);
    setForm(tempTrain[0]);
    setIsUpdate(true);
  };

  // Read
  const getTrains = async (e) => {
    setTrains([]);
    let count = await contract.RemixContract.methods.trainCount().call();

    for (let i = 0; i < count; i++) {
      let train = await contract.RemixContract.methods.trains(i).call();
      console.log(train);

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
      let addMethod = contract.RemixContract.methods.addTrain(
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
      setShowForm(false);
      // alert("Added successfully");
    } catch (e) {
      console.log(e);
      alert("Problem inserting train");
    }
  };

  // Update
  const editTrain = async (e) => {
    e.preventDefault();
    try {
      let updateMethod = contract.RemixContract.methods.updateTrain(
        form.trainNo,
        form.name,
        form.src,
        form.dest,
        form.time,
        form.seats
      );

      let gasEstimate = await updateMethod.estimateGas();
      const response = await updateMethod.send({
        from: authority,
        gas: gasEstimate,
      });
      // console.log(response);

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
      // alert("Updated successfully");
    } catch (e) {
      console.log(e);
      alert("Problem updating train");
    }
  };

  // Delete
  const removeTrain = async (val) => {
    try {
      if (window.confirm("Are you sure you want to delete?")) {
        const gas = await contract.RemixContract.methods
          .deleteTrain(val)
          .estimateGas();
        const response = await contract.RemixContract.methods
          .deleteTrain(val)
          .send({ from: authority, gas });

        setTrains(trains.filter((train) => train.trainNo !== val));
        // console.log(response);
      }
    } catch (Error) {
      alert("Problem deleting train");
    }
  };

  return (
    <div className="container">
      <h1 className="display-5">Trains</h1>

      {/* Search */}
      <SearchTrain
        setFilter={setFilter}
        setIsFound={setIsFound}
        trains={trains}
      />

      {/* Toggle button for displaying form */}
      <TrainButton showForm={showForm} toggleForm={toggleForm} />

      {/* Add/Update Form */}
      <TrainForm
        showForm={showForm}
        isUpdate={isUpdate}
        addTrain={addTrain}
        editTrain={editTrain}
        form={form}
        handleChange={handleChange}
      />

      {/* List all trains */}
      <DisplayTrains
        isFound={isFound}
        filter={filter}
        trains={trains}
        prepopulateData={prepopulateData}
        removeTrain={removeTrain}
      />
    </div>
  );
};

export default Trains;
