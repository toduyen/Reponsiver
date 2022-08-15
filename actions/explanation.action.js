import { sendGet, sendPost } from "utils/requests";
import { GET_EXPLANATION_SUCCESS, UPDATE_EXPLANATION_SUCCESS } from "./action_types";
import notification from "utils/notification";

export const getExplanation = (token, query, mcqtqly) => (dispatch) => {
  const { search, page = 0, size = 20, sort } = query;
  console.log("mcqtql--->>", mcqtqly)
    return sendGet(`${DEV_ENPOINT}invoice/explanations/?size=${size}&search=mcqtqly==${mcqtqly}&should_detail=true&sort=nnhan:DESC`, null, token)
      .then(({ data }) => {
        dispatch({
          type: GET_EXPLANATION_SUCCESS,  
          payload: data,
        });
        return data;
      })
      .catch((err) => {}); 
  };

  export const updateExplanation = (token, data) => (dispatch) => {
    return sendPost(`${DEV_ENPOINT}invoice/explanations/approve`, null, data, token)
      .then(({ data }) => {
        notification.success("Cập nhật dữ liệu thành công");
        dispatch({
          type: UPDATE_EXPLANATION_SUCCESS,
          payload: data,
        });
        return data;
      })
      .catch((err) => {
        notification.errorStrict(err);
      });
  };
  
  