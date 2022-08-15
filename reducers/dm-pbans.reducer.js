import update from "immutability-helper";
import { GET_LIST_DMPBAN } from "actions/action_types";

const initState = {
  status: [],
  listDmpbans: [],
  actionSuccess: false,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_LIST_DMPBAN:
      return update(state, {
        listDmpbans: { $set: payload.datas },
        actionSuccess: { $set: false },
      });
    default:
      return state;
  }
};
