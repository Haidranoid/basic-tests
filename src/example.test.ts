import {sumPositiveNumbers} from "./example";

describe('when the arguments passed are positive numbers', () => {

    test('should return the right answer', () => {
        expect(sumPositiveNumbers(5, 5)).toBe(10);
    });

});

describe('when one of the arguments is a negative number', () => {

    test('should throw an error', () => {
        let error: any;
        try {
            sumPositiveNumbers(-5, 5);
        } catch (e) {
            error = e;
        }

        expect(error).toBeDefined();
        expect(error.message).toBe('One of the numbers is negative')
    })
})
