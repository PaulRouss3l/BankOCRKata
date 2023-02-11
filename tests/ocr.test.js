const fs = require('fs');
const index = require('../index.js')

const getFile = (file) => {
    return fs.readFileSync(file, 'utf8')
}

// User Story 1

// You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices. The machine scans the paper documents, and produces a file with a number of entries which each look like this:

//     _  _     _  _  _  _  _ 
//   | _| _||_||_ |_   ||_||_|
//   ||_  _|  | _||_|  ||_| _|

// Each entry is 4 lines long, and each line has 27 characters. The first 3 lines of each entry contain an account number written using pipes and underscores, and the fourth line is blank. Each account number should have 9 digits, all of which should be in the range 0-9. A normal file contains around 500 entries.

// Your first task is to write a program that can take this file and parse it into actual account numbers.


/*
** INPUT TESTING
*/

test('ensure we have an input file', () => {
    expect(index.readInputFile('tests/fixtures/input.txt')).toBe(getFile('tests/fixtures/input.txt'))
    expect(()=>index.readInputFile('i_dont_exist.txt')).toThrow();
});

test('ensure there is 4 lines', () => {
    expect(index.checkEntryLineSize(getFile('tests/fixtures/input.txt'))).toBe(true)
    expect(index.checkEntryLineSize(getFile('tests/fixtures/to_many_lines.txt'))).toBe(false)
    expect(index.checkEntryLineSize(getFile('tests/fixtures/empty.txt'))).toBe(false)

});

test('ensure there are only | and _ in the 3 first lines', () => {
    expect(index.checkAllowedCharacters(getFile('tests/fixtures/input.txt'))).toBe(true)
    expect(index.checkAllowedCharacters(getFile('tests/fixtures/invalid_char.txt'))).toBe(false)
});

test('ensure there are 27 char in the 3 first lines', () => {
    expect(index.checkLineLength(getFile('tests/fixtures/input.txt'))).toBe(true)
    expect(index.checkLineLength(getFile('tests/fixtures/invalid_line_length.txt'))).toBe(false)

});

test('ensure 4th line is blank', () => {
    expect(index.checkLastLineIsEmpty(getFile('tests/fixtures/input.txt'))).toBe(true)
    expect(index.checkLastLineIsEmpty(getFile('tests/fixtures/invalid_last_line.txt'))).toBe(false)
});

/*
** PARSING
*/

test('ensure we get a number', () => {
    expect(index.getNumber(getFile('tests/fixtures/input.txt'), 0)).toBe("1")
    expect(index.getNumber(getFile('tests/fixtures/input.txt'), 4)).toBe("5")
    expect(index.getNumber(getFile('tests/fixtures/input.txt'), 180)).toBe("?") // invalid offset
    expect(index.getNumber(getFile('tests/fixtures/invalid_char.txt', 0))).toBe("?") // invalid char
});


test('ensure we get numbers from a line', () => {
    expect(index.getBankAccountNumber(getFile('tests/fixtures/input.txt'))).toBe("123456789")
    expect(index.getBankAccountNumber(getFile('tests/fixtures/invalid_char.txt'))).toBe("?23456789")
    expect(index.getBankAccountNumber(getFile('tests/fixtures/897560421.txt'))).toBe("897560421")
});
