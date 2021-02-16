import { observable, action, makeObservable, computed, autorun } from 'mobx';
import { HigCover, defaultHigCover, TagList } from './defined';
import { getHighquality, getCatList, getMusicListHotTag, getPlayList } from '@/common/api/play_list';
import { Pagination, defaultPagination } from '../global';


export class PlayListStore {
  constructor() {
    makeObservable(this);

    autorun(() => {
      const { pageSize, current } = this.pagination;
      getPlayList(this.cat, pageSize, (current - 1) * pageSize).then((res: any) => {
        const { playlists, total } = res.data;
        this.setPlaylist(playlists);
        if (this.pagination.total === 1) {
          this.setPagationTotal(total);
        }
      });
    });
  }
  @observable
  higCover: HigCover = defaultHigCover;

  @observable
  hotTags = [];

  @observable
  tagLists: Array<TagList> = [];

  @observable
  playlists: any[] = [];

  @observable
  pagination: Pagination = defaultPagination;

  @observable
  ajaxTimer = 0;

  @observable
  cat: string = '全部';

  @computed
  get isSpinning() {
    return this.ajaxTimer === 0 ? false : true;
  }

  @action
  setPagination = (current: number, pageSize: number) => {
    this.pagination.current = current;
    if (pageSize !== this.pagination.pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.total = 1;
    }
  };

  @action
  setCat = (cat: string = '全部') => {
    this.cat = cat;
    this.pagination.total = 1;
    this.pagination.current = 1;
  };

  @action
  getData = () => {
    this.ajaxTimer++;
    const getHigCover = getHighquality(1).then((res: any) => {
      const data = res.data.playlists[0];
      this.higCover = data;
    });

    const getAllCatList = getCatList().then((res: any) => {
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
      this.tagLists = _tagLists;
    });

    const getHotTag = getMusicListHotTag().then((res: any) => {
      const tags = res.data.tags;
      this.hotTags = tags;
    });

    Promise.all([getHigCover, getAllCatList, getHotTag])
      .then(res => {
        this.ajaxTimer--;
      })
      .catch(err => {
        this.ajaxTimer--;
        alert(err);
      });
  };

  @action
  setPagationTotal = (total: number) => {
    this.pagination.total = total;
  };

  @action
  setPlaylist = (playlists: any[] = []) => {
    this.playlists = playlists;
  };
}

export default new PlayListStore();
