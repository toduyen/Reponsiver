import update from "immutability-helper";
import { LAYOUT_TOGGLE_LOADING } from "actions/action_types";

const initState = {
  isLoading: false,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case LAYOUT_TOGGLE_LOADING: {
      return update(state, { isLoading: { $set: payload } });
    }
    default:
      return state;
  }
};
