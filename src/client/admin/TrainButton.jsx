const TrainButton = ({ showForm, toggleForm }) => {
  return (
    <div>
      <button
        className={`btn my-3 ${showForm ? "btn-danger" : "btn-primary"}`}
        onClick={toggleForm}
      >
        {showForm ? "Close" : "Add Train"}
      </button>
    </div>
  );
};

export default TrainButton;
