import testStore, { TestStore } from './test';
import playListStore, { PlayListStore } from './play_list/index';
import playListDetailStore, {PlayListDetailStore} from './playlist_detail/index';
import playMusicStore, {PlayMusicStore} from './play_music';

export interface Store {
  testStore: TestStore;
  playListStore: PlayListStore;
  playListDetailStore: PlayListDetailStore;
  playMusicStore: PlayMusicStore;
}

const AppStore: Store = {
  testStore,
  playListStore,
  playListDetailStore,
  playMusicStore,
};

export default AppStore;
