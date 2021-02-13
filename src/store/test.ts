import { observable, action, makeObservable } from 'mobx';

export class TestStore {
  constructor() {
    makeObservable(this);
  }
  @observable
  count: number = 1;

  @action
  setCount = () => {
    this.count++;
    console.log(this.count);
  };
}

export default new TestStore();
