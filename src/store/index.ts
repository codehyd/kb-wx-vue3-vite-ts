import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { IRootState, IStoreType } from "./type";

import login from "./login";

const store = createStore<IRootState>({
  state: {},
  modules: {
    login,
  },
});

export default store;

export function useStore(): Store<IStoreType> {
  return vuexUseStore();
}

export const localSetup = () => {
  store.dispatch("login/loaclSetup");
};
