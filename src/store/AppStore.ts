import testStore, { TestStore } from './test';

interface Store {
  testStore: TestStore;
}

const AppStore: Store = {
  testStore
};

export default AppStore;
