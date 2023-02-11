const fs = require('fs');
const { EOL } = require('os');
const ERROR_CHAR = "?"

const entryLineSize = 4;
const entries = {
    "1": "   " +
        "  |" +
        "  |",
    "2": " _ " +
        " _|" +
        "|_ ",
    "3": " _ " +
        " _|" +
        " _|",
    "4": "   " +
        "|_|" +
        "  |",
    "5": " _ " +
        "|_ " +
        " _|",
    "6": " _ " +
        "|_ " +
        "|_|",
    "7": " _ " +
        "  |" +
        "  |",
    "8": " _ " +
        "|_|" +
        "|_|",
    "9": " _ " +
        "|_|" +
        " _|",
    "0": " _ " +
        "| |" +
        "|_|",
}

const readInputFile = (inputFile) => {
    const data = fs.readFileSync(inputFile, 'utf8')
    return data
}

const checkEntryLineSize = (fileContent) => {
    return fileContent.split(EOL).length === entryLineSize;
}

const checkAllowedCharacters = (fileContent) => {
    return /^[\|_ ]+$/.test(fileContent.split(EOL).join(''));
}

const checkLastLineIsEmpty = (fileContent) => {
    const lastLine = fileContent.split(EOL).slice(-1)
    return lastLine == ''
}

const checkLineLength = (fileContent) => {
    const contentLines = fileContent.split(EOL).slice(0, 3)
    return contentLines.some((x) => x.length != 27) == false;
}

const syntaxCheck = (fileContent) => {
    return checkEntryLineSize(fileContent) &&
        checkAllowedCharacters(fileContent) &&
        checkLastLineIsEmpty(fileContent) &&
        checkLineLength(fileContent);
}

const getNumber = (fileContent, offset) => {
    const contentLines = fileContent.split(EOL).slice(0, 3);
    const numberString = contentLines.map((line) => line.slice(offset * 3, (offset + 1) * 3)).join('');
    for (const [value, entry] of Object.entries(entries)) {
        if (entry == numberString) {
            return value;
        }
    }
    return ERROR_CHAR
}

const getBankAccountNumber = (fileContent) => {
    return [...Array(9).keys()].map((offset) => getNumber(fileContent, offset).toString()).join('');
}

module.exports = {
    // input handling
    readInputFile: readInputFile,
    checkEntryLineSize: checkEntryLineSize,
    checkAllowedCharacters: checkAllowedCharacters,
    checkLastLineIsEmpty: checkLastLineIsEmpty,
    checkLineLength: checkLineLength,
    syntaxCheck: syntaxCheck,
    // parsing
    getNumber: getNumber,
    getBankAccountNumber: getBankAccountNumber,
}