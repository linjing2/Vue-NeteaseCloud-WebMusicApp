import testStore, { TestStore } from './test';
import playListStore, { PlayListStore } from './play_list/index';
import playListDetailStore, {PlayListDetailStore} from './playlist_detail/index';

export interface Store {
  testStore: TestStore;
  playListStore: PlayListStore;
  playListDetailStore: PlayListDetailStore;
}

const AppStore: Store = {
  testStore,
  playListStore,
  playListDetailStore,
};

export default AppStore;
