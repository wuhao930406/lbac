import { addstore,editstore } from '@/services/weapp';

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


  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, ...action.payload };
    }
  },
};
export default UserModel;
