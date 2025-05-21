import { describe, test, expect, vi, beforeEach } from 'vitest';
import type { APIGatewayProxyEvent } from 'aws-lambda';

import { handler } from '../src/handler';
import * as validateService from '../src/services/validateRequestBody';
import * as analyseService from '../src/services/analyseText';
import { HttpStatusCode } from '../src/enums//HttpStatusCode';

describe('Lambda handler', () => {
    const validationStub = vi.spyOn(validateService, 'default');
    const analyseStub = vi.spyOn(analyseService, 'default');
    const VALID_BODY = JSON.stringify({ text: 'Hello world' });
    const FAIL_VALIDATION_BODY = JSON.stringify({ text: 'Nope' });
    const INVALID_BODY = 'not json';

    beforeEach(() => {
        vi.resetAllMocks();
    });

    test('returns 400 if no body', async () => {
        const event = { body: null } as APIGatewayProxyEvent;
        const result = await handler(event);
    
        expect(result.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
        expect(JSON.parse(result.body).message).toBe('Missing request body');

        expect(validationStub).not.toHaveBeenCalled();
        expect(analyseStub).not.toHaveBeenCalled();
  });

  test('returns 400 if body is invalid JSON', async () => {
    const event = { body: INVALID_BODY } as APIGatewayProxyEvent;
    const result = await handler(event);

    expect(result.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(JSON.parse(result.body).message).toBe('Unexpected token \'o\', "not json" is not valid JSON');

    expect(validationStub).not.toHaveBeenCalled();
    expect(analyseStub).not.toHaveBeenCalled();
  });

  test('returns 400 if validation throws', async () => {
    const event = { body: FAIL_VALIDATION_BODY } as APIGatewayProxyEvent;
    const parsedBody = JSON.parse(FAIL_VALIDATION_BODY);

    const result = await handler(event);

    expect(result.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(JSON.parse(result.body).message).toBe('Invalid request: "text" must be at least 5 characters.');

    expect(validationStub).toHaveBeenCalledTimes(1);
    expect(validationStub).toHaveBeenCalledWith(parsedBody);

    expect(analyseStub).not.toHaveBeenCalled();
  });


  test('returns 200 and analysis result on success', async () => {
    const event = { body: VALID_BODY } as APIGatewayProxyEvent;
    const parsedBody = JSON.parse(VALID_BODY);

    const mockAnalysisResult = {
      wordCount: 2,
      characterCount: 11,
      lineCount: 1,
      longestWordLength: 5,
      mostCommonLetter: 'l',
    };



    const result = await handler(event);

    expect(result.statusCode).toBe(HttpStatusCode.OK);
    expect(JSON.parse(result.body)).toEqual(mockAnalysisResult);

    expect(validationStub).toHaveBeenCalledTimes(1);
    expect(validationStub).toHaveBeenCalledWith(parsedBody);

    expect(analyseStub).toHaveBeenCalledTimes(1);
    expect(analyseStub).toHaveBeenCalledWith(parsedBody.text);
  });
});