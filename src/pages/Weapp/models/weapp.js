import { addstore, editstore, addfactory, editfactory } from '@/services/weapp';

const UserModel = {
  namespace: 'weapp',
  state: {
    currentUser: {},
  },
  effects: {
    *addstore({ payload }, { call, put }) {
      const response = yield call(addstore, payload);
      return response
    },
    *editstore({ payload }, { call, put }) {
      const response = yield call(editstore, payload);
      return response
    },
    *addfactory({ payload }, { call, put }) {
      const response = yield call(addfactory, payload);
      return response
    },
    *editfactory({ payload }, { call, put }) {
      const response = yield call(editfactory, payload);
      return response
    },

  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, ...action.payload };
    }
  },
};
export default UserModel;
