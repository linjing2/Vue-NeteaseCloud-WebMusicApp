import testStore, { TestStore } from './test';

export interface Store {
  testStore: TestStore;
}

const AppStore: Store = {
  testStore
};

export default AppStore;
