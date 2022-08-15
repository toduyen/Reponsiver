import {
  GET_LIST_ARISE_SUCCESS,
  UPDATE_LIST_ARISE_SUCCESS,
} from "actions/action_types";
import update from "immutability-helper";
import {
  UPDATE_LIST_ARISE_RESULT_SUCCESS,
  GET_LIST_ARISE_RESULT_SUCCESS,
} from "../actions/action_types";

export default (
  state = {
    proposalArisesList: [],
    actionSuccess: false,
    actionResultSuccess: false,
  },
  action
) => {
  switch (action.type) {
    case GET_LIST_ARISE_SUCCESS: {
      return update(state, {
        proposalArisesList: { $set: action?.payload.datas || [] },
        actionSuccess: { $set: false },
      });
    }
    case GET_LIST_ARISE_RESULT_SUCCESS: {
      return update(state, {
        actionResultSuccess: { $set: false },
      });
    }
    case UPDATE_LIST_ARISE_SUCCESS: {
      return update(state, {
        actionSuccess: { $set: true },
      });
    }
    case UPDATE_LIST_ARISE_RESULT_SUCCESS: {
      return update(state, {
        actionResultSuccess: { $set: true },
      });
    }
    default:
      return state;
  }
};
