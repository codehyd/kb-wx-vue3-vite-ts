import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { IRootState, IStoreType } from "./type";

import login from "./login";
import user from "./user";

const store = createStore<IRootState>({
  state: {},
  modules: {
    login,
    user,
  },
});

export default store;

export function useStore(): Store<IStoreType> {
  return vuexUseStore();
}

export const localSetup = () => {
  store.dispatch("login/loaclSetup");
};
