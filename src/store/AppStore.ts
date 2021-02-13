import testStore, { TestStore } from './test';
import playListStore, { PlayListStore } from './play_list/index';

export interface Store {
  testStore: TestStore;
  playListStore: PlayListStore;
}

const AppStore: Store = {
  testStore,
  playListStore,
};

export default AppStore;
