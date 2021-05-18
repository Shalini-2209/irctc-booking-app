const DisplayTrains = ({
  isFound,
  filter,
  trains,
  prepopulateData,
  removeTrain,
}) => {
  return (
    <div>
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

export default DisplayTrains;
