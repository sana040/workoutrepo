import React, { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/authcontext";
import { WorkoutContext } from "../context/context";

function WorkTemp(workout) {
  const { dispatch } = useContext(WorkoutContext);
  const { user } = useContext(AuthContext);
  const deletefunction = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "http://localhost:4000/workout/" + workout.data._id,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.data.title}</h4>
      <p>
        <strong>Load (kg) : {workout.data.load}</strong>
      </p>
      <p>
        <strong>Reps : {workout.data.reps}</strong>
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.data.createdAt), {
          addSuffix: true,
        })}
      </p>
      <span onClick={deletefunction}>
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
  );
}

export default WorkTemp;
