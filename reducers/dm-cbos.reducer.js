import update from "immutability-helper";
import { GET_LIST_DMCBO } from "actions/action_types";

const initState = {
  status: [],
  listDmcbos: [],
  actionSuccess: false,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_LIST_DMCBO:
      return update(state, {
        listDmcbos: { $set: payload },
        actionSuccess: { $set: false },
      });
    default:
      return state;
  }
};
