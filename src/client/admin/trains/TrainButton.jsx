const ToggleFormButton = ({ showForm, toggleForm }) => {
  return (
    <button
      className={`btn ${showForm ? "btn-danger px-3" : "btn-primary"}`}
      onClick={toggleForm}
    >
      {showForm ? "Close" : "Add Train"}
    </button>
  );
};

const ActionButton = ({ text, action, trainNo }) => {
  return (
    <button
      className={`btn mx-1 ${text === "Update" ? "btn-primary" : "btn-danger"}`}
      onClick={() => action(trainNo)}
    >
      {text}
    </button>
  );
};

export { ToggleFormButton, ActionButton };
