const colorsMatch = require('./utils/colors-match.util');

test('Return true if colors are match', () => {
    expect(colorsMatch('FFEB3B', 'FFEB3B')).toBe(true);
});

test('Return false if colors are match', () => {
    expect(colorsMatch('FFEB3B', 'FFC107')).toBe(false);
});
