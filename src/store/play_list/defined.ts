export interface HigCover {
  coverImgUrl: string;
  name: string;
  copywriter: string;
  [propname: string]: any;
}

export const defaultHigCover = {
  coverImgUrl: '',
  name: '',
  copywriter: ''
};

export interface TagList {
  categories: { id: number; name: string };
  subs: Array<any>;
}

export const defaultTagList = {
  categories: { id: NaN, name: '' },
  subs: []
};
