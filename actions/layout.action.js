import { LAYOUT_TOGGLE_LOADING } from "./action_types";

export const layoutToggleLoading = (payload) => {
  return { type: LAYOUT_TOGGLE_LOADING, payload };
};
