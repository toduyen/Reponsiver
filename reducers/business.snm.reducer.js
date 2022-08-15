import update from "immutability-helper";
import {
  APPROVE_DNNVQD_SUCCESS,
  CREATE_DNNVQD_SUCCESS,
  GET_DS_DNNVQD_SUCCESS,
  UPDATE_DNNVQD_SUCCESS,
  SUBMIT_DNNVQD_SUCCESS,
  REJECT_DNNVQD_SUCCESS,
} from "../actions/action_types";

const initState = {
  actionSuccess: false,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_DS_DNNVQD_SUCCESS: {
      return update(state, { actionSuccess: { $set: false } });
    }
    case CREATE_DNNVQD_SUCCESS: {
      return update(state, { actionSuccess: { $set: true } });
    }
    case UPDATE_DNNVQD_SUCCESS: {
      return update(state, { actionSuccess: { $set: true } });
    }
    case SUBMIT_DNNVQD_SUCCESS: {
      return update(state, { actionSuccess: { $set: true } });
    }
    case APPROVE_DNNVQD_SUCCESS: {
      return update(state, { actionSuccess: { $set: true } });
    }
    case REJECT_DNNVQD_SUCCESS: {
      return update(state, { actionSuccess: { $set: true } });
    }
    default:
      return state;
  }
};
