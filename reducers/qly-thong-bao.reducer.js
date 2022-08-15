import { GET_EXPLANATION_SUCCESS } from "actions/action_types";
import update from "immutability-helper";

export default (
  state = {
    listExplanation: [],

  },
  action
) => {
  switch (action.type) {
    case GET_EXPLANATION_SUCCESS: {
      return update(state, {
        listExplanation: { $set: action?.payload?.datas || []},
      });
    }

    default:
      return state;
  }
};
