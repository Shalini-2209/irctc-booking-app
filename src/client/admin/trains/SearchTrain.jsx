const SearchTrain = ({ setFilter, setIsFound, trains, showForm }) => {
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
  };

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Train name"
        onChange={filterItems}
      />
    </div>
  );
};

export default SearchTrain;
