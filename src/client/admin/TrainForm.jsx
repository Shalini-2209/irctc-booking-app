const TrainForm = ({
  showForm,
  isUpdate,
  editTrain,
  addTrain,
  handleChange,
  form,
}) => {
  return (
    <div>
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
            {isUpdate ? "Update" : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default TrainForm;
