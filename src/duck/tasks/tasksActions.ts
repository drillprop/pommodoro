import {
  CREATE_TASK,
  EDIT_TASK,
  DELETE_TASK,
  SWITCH_TASK
} from '../reduxTypes';
import {
  saveTasksInFirestore,
  deleteTaskFromFirestore,
  updateTaskInFirestore,
  saveSelectedTask
} from '../../utils/firebase/firestore';

export const createTask = (taskName: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: CREATE_TASK,
        taskName
      });
      await saveTasksInFirestore(taskName);
    } catch (err) {
      console.error(err);
    }
  };
};

export const editTask = (prevTask: string, newTask: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: EDIT_TASK,
        prevTask,
        newTask
      });
      await updateTaskInFirestore(prevTask, newTask);
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteTask = (taskName: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: DELETE_TASK,
        taskName
      });
      await deleteTaskFromFirestore(taskName);
    } catch (err) {
      console.error(err);
    }
  };
};

export const switchTask = (taskName: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: SWITCH_TASK, taskName });
      await saveSelectedTask(taskName);
    } catch (err) {
      console.error(err);
    }
  };
};
