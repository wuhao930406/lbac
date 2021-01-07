import { addstore, editstore, addfactory, editfactory, addkeyword, editkeyword,addmax_classify,editmax_classify,addmin_classify,editmin_classify  } from '@/services/weapp';

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
    *addkeyword({ payload }, { call, put }) {
      const response = yield call(addkeyword, payload);
      return response
    },
    *editkeyword({ payload }, { call, put }) {
      const response = yield call(editkeyword, payload);
      return response
    },
    *addmax_classify({ payload }, { call, put }) {
      const response = yield call(addmax_classify, payload);
      return response
    },
    *editmax_classify({ payload }, { call, put }) {
      const response = yield call(editmax_classify, payload);
      return response
    },
    *addmin_classify({ payload }, { call, put }) {
      const response = yield call(addmin_classify, payload);
      return response
    },
    *editmin_classify({ payload }, { call, put }) {
      const response = yield call(editmin_classify, payload);
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
