console.log('test ts, watch and compile v');

let leleka: string = 'leleka';
// let variableName: type = ...;

console.log(leleka.length);

// types:
// - number, string, boolean, undefined;
// - number[], string[], boolean[], undefined[];
// - [number], [number, string[], boolean{}...];
// - {}

// function with return - type of returnValue;
const func1 = (name: string): string => name + '!'
// const functionName = (parameter: returnValueType) => returnExpression as returnValueType;

// function without return - void
const func2 = (number: number): void => {
    console.log(number);
}
// const functionName = (parameter: returnValueType) => expression without returnValue;