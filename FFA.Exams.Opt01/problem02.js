
function getUniqueNumberArray(numbers) {
    const uniqueNumbers = numbers.reduce((accumulator, element) => {
        if(accumulator.indexOf(element) === -1) {
            accumulator.push(element)
        }
        return accumulator
    }, [])
    return uniqueNumbers;
}
function countOccurrencesNumberInArray(numbers, x) {
    let count = 0;
    for (let i = 0; i < numbers.length; i++) {
        if(numbers[i] == x) {
            count++
        }
    }
    return count
}
function countOccurrencesAllElementOfArray(numbers) {
    const inputUniqueNumbers = getUniqueNumberArray(numbers);
    return inputUniqueNumbers.map(element => {
        return countOccurrencesNumberInArray(numbers, element)
    }) 
}

function convertToOccurencesArray(numbers){
    const inputUniqueNumbers = getUniqueNumberArray(numbers)
    return inputUniqueNumbers.map(element => {
        return countOccurrencesNumberInArray(numbers, element)
    })
}
function checkEqualFrequency(inputArray) {
    const occurencesArray = convertToOccurencesArray(inputArray)
    let check = occurencesArray[0]
    const OccurrencesNumberInArray = countOccurrencesNumberInArray(occurencesArray, check)
    if(OccurrencesNumberInArray == occurencesArray.length) {
        return true
    } else return false
    
}
const inputNumbers = [1, 2, 2, 1]
const inputNumbers2 = [1, 2, 2, 3, 1, 3, 1, 3]
console.log(checkEqualFrequency(inputNumbers))
console.log(checkEqualFrequency(inputNumbers2))