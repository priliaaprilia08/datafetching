import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { COMPLETED_TODO, COMPLETED_TODOAsync, DELETE_TODO, DELETE_TODOAsync, getTodosAsync } from "../redux/todoSlice";
import deleteIcon from "../assets/img/delete.png";

const TodoList = ({id, title, completed })  => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  
  const handleChecked = () => {
    dispatch(COMPLETED_TODOAsync({ id, completed: !completed }));
  };

  const handleDeleteClick = () => {
    dispatch(DELETE_TODOAsync({ id }));
  };

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <div className="box mb-3 p-3">
      {todos.length > 0 ? (
        <>
          {todos.map((todo) => {
            return (
              <div
                className="list border-bottom border-dark p-2"
                key={todo.id}
              >
                <input
                  type="checkbox"
                  checked={completed}
                  onClick={handleChecked}
                />

                {todo.completed ? (
                  <span className="btn-warning ps-3 pe-3">
                    <s style={{ color: "red" }}>{todo.title}</s>
                  </span>
                ) : (
                  <span className="ps-1">{todo.title}</span>
                )}
                <button
                  onClick={handleDeleteClick}
                  style={{
                    background: "transparent",
                    border: "none",
                  }}
                >
                    <img srcSet={deleteIcon} alt="" style={{ width: "30px" }} />
                  </button>
                </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TodoList;
