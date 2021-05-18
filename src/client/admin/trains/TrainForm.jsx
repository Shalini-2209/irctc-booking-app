import { ToggleFormButton } from "./TrainButton";

const TrainForm = ({
  showForm,
  isUpdate,
  toggleForm,
  editTrain,
  addTrain,
  handleChange,
  form,
}) => {
  return (
    <div>
      {showForm && (
        <form onSubmit={isUpdate ? editTrain : addTrain}>
          <div className="row my-2">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Train Number"
                name="trainNo"
                onChange={handleChange}
                value={form.trainNo}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Source"
                name="src"
                onChange={handleChange}
                value={form.src}
                required
              />
            </div>
            <div className="col">
              <input
                type="time"
                className="form-control"
                placeholder="Time of Departure"
                name="time"
                onChange={handleChange}
                value={form.time}
                required
              />
            </div>
          </div>
          <div className="row my-2">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Train Name"
                name="name"
                onChange={handleChange}
                value={form.name}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Destination"
                name="dest"
                onChange={handleChange}
                value={form.dest}
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Number of Seats"
                name="seats"
                onChange={handleChange}
                value={form.seats}
                required
              />
            </div>
          </div>
          <div className="myButtons my-3">
            <button type="submit" className="btn btn-primary me-2">
              {isUpdate ? "Update" : "Submit"}
            </button>
            <ToggleFormButton showForm={showForm} toggleForm={toggleForm} />
          </div>
        </form>
      )}
    </div>
  );
};

export default TrainForm;
