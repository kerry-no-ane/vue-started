const { sum, makeUser, makeRange } = require('./modules');

describe('test index.js file', () => {
  it('sums a and b', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(3, 4)).toBe(7);
  });

  it('makes a person', () => {
    expect(makeUser('Yakuza', 20)).toEqual({
      name: 'Yakuza',
      age: 20,
    });
  });

  it('has 3', () => {
    expect(makeRange(1, 4)).toContain(2);
  });
});