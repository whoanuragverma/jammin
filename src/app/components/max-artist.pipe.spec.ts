import { MaxArtistPipe } from './max-artist.pipe';

describe('MaxArtistPipe', () => {
  it('create an instance', () => {
    const pipe = new MaxArtistPipe();
    expect(pipe).toBeTruthy();
  });
});
