import update from "immutability-helper";
import {
  CREATE_ACCOUNT_SUCCESS,
  GET_LIST_ACCOUNT_SUCCESS,
  GET_ROLE_LIST_SUCCESS,
  UPDATE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  GET_FULL_CQT_LIST_SUCCESS,
  GET_NEW_PRIVILEGES_SUCCESS,
} from "actions/action_types";
import {
  GET_PRIVILEGES_SUCCESS,
  CREATE_GROUP_SUCCESS,
  UPDATE_GROUP_SUCCESS,
  DELETE_GROUP_SUCCESS,
} from "actions/action_types";
import { GET_FULL_ROLE_LIST_SUCCESS } from "../actions/action_types";

const initState = {
  status: [],
  listAccount: [],
  listRole: [],
  listPrivileges: [],
  defaultExpandedKeys: [],
  cqt: {
    listPrivileges: [],
    defaultExpandedKeys: [],
  },
  mst: {
    listPrivileges: [],
    defaultExpandedKeys: [],
  },
  listCqts: [],
  actionSuccess: false,
  deleteSuccess: false,
  actionStatus: false,
};

const buildTree = (data) => {
  let map = new Map(data.map((v) => [v.code, v]));
  for (let value of map.values()) {
    if (value.parent_code && map.get(value.parent_code)) {
      let parent = map.get(value.parent_code);
      parent.children = parent.children ? [...parent.children, value] : [value];
    }
  }
  const tree = data.filter((v) => !v.parent_code || !map.get(v.parent_code));
  return tree;
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_LIST_ACCOUNT_SUCCESS:
      return update(state, {
        listAccount: { $set: payload },
        actionSuccess: { $set: false },
      });
    case GET_FULL_ROLE_LIST_SUCCESS:
      return update(state, {
        listRole: { $set: payload.datas },
      });
    case GET_FULL_CQT_LIST_SUCCESS:
      return update(state, {
        listCqts: { $set: payload.datas },
      });
    case GET_ROLE_LIST_SUCCESS:
      return update(state, {
        actionSuccess: { $set: false },
      });
    case GET_PRIVILEGES_SUCCESS:
      return update(state, {
        listPrivileges: { $set: buildTree(payload) },
        defaultExpandedKeys: { $set: payload.map((el) => el.code) },
      });
    case GET_NEW_PRIVILEGES_SUCCESS:
      return update(state, {
        cqt: {
          listPrivileges: { $set: buildTree(payload.cqt) },
          defaultExpandedKeys: { $set: payload.cqt.map((el) => el.code) },
        },
        mst: {
          listPrivileges: { $set: buildTree(payload.mst) },
          defaultExpandedKeys: { $set: payload.mst.map((el) => el.code) },
        },
      });
    case CREATE_ACCOUNT_SUCCESS: {
      return update(state, {
        actionSuccess: { $set: true },
        actionStatus: { $set: false },
      });
    }
    case UPDATE_ACCOUNT_SUCCESS: {
      return update(state, {
        actionSuccess: { $set: true },
        actionStatus: { $set: false },
      });
    }
    case CREATE_GROUP_SUCCESS: {
      return update(state, {
        actionSuccess: { $set: true },
        actionStatus: { $set: false },
      });
    }
    case UPDATE_GROUP_SUCCESS: {
      return update(state, {
        actionSuccess: { $set: true },
        actionStatus: { $set: false },
      });
    }
    case DELETE_ACCOUNT_SUCCESS: {
      return update(state, {
        deleteSuccess: { $set: true },
        actionSuccess: { $set: true },
      });
    }
    case DELETE_GROUP_SUCCESS: {
      return update(state, {
        deleteSuccess: { $set: true },
        actionSuccess: { $set: true },
      });
    }
    default:
      return state;
  }
};
