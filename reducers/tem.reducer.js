import { GET_TEM_SUCCESS, UPDATE_TEM_SUCCESS } from "actions/action_types";
import update from "immutability-helper";

const initState = {
  actionSuccess: false,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_TEM_SUCCESS:
      return update(state, {
        actionSuccess: { $set: false },
      });
    case UPDATE_TEM_SUCCESS:
      return update(state, {
        actionSuccess: { $set: true },
      });
    default:
      return state;
  }
};
