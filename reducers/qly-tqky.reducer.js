import update from "immutability-helper";
import {
  GET_LIST_QLTQK_SUCCESS,
  CREATE_QLTQK_SUCCESS,
  UPDATE_QLTQK_SUCCESS,
  DELETE_QLTQK_SUCCESS,
  GET_LIST_NOTIFCATION_SUCCESS,
} from "actions/action_types";

const initState = {
  status: [],
  listTQKY: [],
  listNotification: [],
  actionSuccess: false,
  deleteSuccess: false,
  actionStatus: false,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_LIST_QLTQK_SUCCESS:
      return update(state, {
        listTQKY: { $set: payload },
        actionSuccess: { $set: false },
      });
    case GET_LIST_NOTIFCATION_SUCCESS:
      return update(state, {
        listNotification: { $set: payload },
      });

    case CREATE_QLTQK_SUCCESS: {
      return update(state, {
        actionSuccess: { $set: true },
        actionStatus: { $set: false },
      });
    }
    case UPDATE_QLTQK_SUCCESS: {
      return update(state, {
        actionSuccess: { $set: true },
        actionStatus: { $set: false },
      });
    }
    case DELETE_QLTQK_SUCCESS: {
      return update(state, {
        deleteSuccess: { $set: true },
        actionSuccess: { $set: true },
      });
    }
    default:
      return state;
  }
};
