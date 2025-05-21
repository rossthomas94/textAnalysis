import { describe, test, expect } from 'vitest';

// Services
import validateRequestBody  from '../../src/services/validateRequestBody';

describe('validateRequestBody', () => {
    test('Throw - Missing "text" prop from request body', () => {
        try {
            validateRequestBody({notText: 'Hello world!'});
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe(
                'Invalid request: "text" field is missing or not a string.',
            );
        }
    })

    test('Throw - The "text" prop is empty', () => {
        try {
            validateRequestBody({text: ''});
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe(
                'Invalid request: "text" cannot be empty.',
            );
        }
    })

    test('Throw - The "text" prop does not meet minium char length', () => {
        try {
            validateRequestBody({text: 'Nope'});
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe(
                'Invalid request: "text" must be at least 5 characters.',
            );
        }
    })

    test('Throw - The "text" prop exceeds maxium char length', () => {
        const superLongText = 'a'.repeat(301);
        try {
            validateRequestBody({text: superLongText});
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe(
                'Invalid request: "text" cannot exceed 300 characters.',
            );
        }
    })

    test('Success - The "text" prop is valid and passes validation', () => {
        const result = validateRequestBody({text: 'Hello world!'});
        expect(result).toBeUndefined();
    })
});