import { createStore, action } from "easy-peasy";

import auth from "utils/auth";

const storeModel = {
  // group
  auth: {
    // states
    isLoggedIn: auth.isAuth(),
    // actions
    loginSuccess: action((state, token) => {
      auth.setAccessToken(token);
      state.isLoggedIn = true;
    }),
    logout: action((state) => {
      auth.removeAccessToken();
      state.isLoggedIn = false;
    }),
  },
};

const storeConfigs = {};

const store = createStore(storeModel, storeConfigs);

export default store;
