import { FilteringByKeyWordsPipe } from './filtering-by-key-words.pipe';

describe('FilteringByKeyWordsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilteringByKeyWordsPipe();
    expect(pipe).toBeTruthy();
  });
});
