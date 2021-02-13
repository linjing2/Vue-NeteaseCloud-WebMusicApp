import { observable, action, makeObservable } from 'mobx';
import { HigCover, defaultHigCover, TagList } from './defined';
import { getHighquality, getCatList } from '@/common/network/play_list';

export class PlayListStore {
  constructor() {
    makeObservable(this);
  }
  @observable
  higCover: HigCover = defaultHigCover;
  @observable
  hotTags = [];
  @observable
  tagLists: Array<TagList> = [];

  @action
  getHigCover = async () => {
    await getHighquality(1).then((res: any) => {
      const data = res.data.playlists[0];
      this.higCover = data;
      console.log(this.higCover);
    });
  };
  @action
  getCatList = () => {
    getCatList().then((res: any) => {
      const categories = Object.values(res.data.categories); // 歌单分类
      const subs = res.data.sub; // 所有子标签

      const _tagLists = [] as Array<TagList>;
      /** 对subs进行分类 */
      categories.some((name: any, id: number) => {
        const cartItem = {
          categories: { id, name },
          subs: []
        };
        _tagLists.push(cartItem);
      });

      subs.some((sub: any, index: number) => {
        _tagLists[sub.category].subs.push(sub);
      });
      console.log(_tagLists);
      this.tagLists = _tagLists;
    });
  };
}

export default new PlayListStore();
