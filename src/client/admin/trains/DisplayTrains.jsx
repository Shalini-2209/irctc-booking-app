import { ActionButton } from "./TrainButton";

const DisplayTrains = ({ trains, searchVal, prepopulateData, removeTrain }) => {
  return (
    <div>
      <table className="table my-3">
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

        <tbody>
          {trains
            .filter((train) => {
              if (searchVal === "") {
                return train;
              } else if (train.name.toLowerCase().indexOf(searchVal) !== -1) {
                return train;
              }
            })
            .map((train, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{train.trainNo}</td>
                <td>{train.name}</td>
                <td>{train.time} Hr</td>
                <td>{train.src}</td>
                <td>{train.dest}</td>
                <td>{train.seats}</td>
                <td>
                  {/* Update and delete buttons */}
                  <ActionButton
                    text="Update"
                    action={prepopulateData}
                    trainNo={train.trainNo}
                  />
                  <ActionButton
                    text="Delete"
                    action={removeTrain}
                    trainNo={train.trainNo}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTrains;
