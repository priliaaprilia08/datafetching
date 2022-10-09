import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_TODOAsync } from "../redux/todoSlice";

function AddTodo() {
  const dispatch = useDispatch();
  const [activity, setActivity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activity) return alert("Silahkan Add Todo Terlebih dulu!");
    console.log(activity);
    addActivity(activity);
    setActivity("");
  };

  const addActivity = (text) => {
    const newTodos = { id: activity.length + 1, title: text, completed: false };
    dispatch(ADD_TODOAsync(newTodos));
  };
  return (
    <div>
      <h1 className="p-3">TODO APP</h1>
      <form onSubmit={handleSubmit} className="row p-3">
        <div className="col-11">
          <input
            id="activity"
            type="text"
            placeholder="Add todo..."
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="form-control rounded-pill input-group-append"
          />
        </div>
        <div className="col-1">
          <button className="btn btn-outline space-around">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
