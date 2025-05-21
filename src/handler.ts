// AWS Lambda
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// Enums
import { HttpStatusCode } from './enums/HttpStatusCode';
// Interfaces
import type { RequestBody } from './interfaces/RequestBody';
// Services
import analyseText from './services/analyseText';
import validateRequestBody from './services/validateRequestBody';

export async function handler(
	event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
	try {
		if (!event.body) {
			return {
				statusCode: HttpStatusCode.BAD_REQUEST,
				body: JSON.stringify({ message: 'Missing request body' }),
			};
		}

		let parsedBody: RequestBody;
		try {
			const jsonRequestBody = JSON.parse(event.body);
			validateRequestBody(jsonRequestBody);
			parsedBody = jsonRequestBody;
		} catch (err) {
			return {
				statusCode: HttpStatusCode.BAD_REQUEST,
				body: JSON.stringify({
					message: err instanceof Error ? err.message : 'Invalid request body',
				}),
			};
		}

		const textSumamryResult = analyseText(parsedBody.text);

		return {
			statusCode: HttpStatusCode.OK,
			body: JSON.stringify(textSumamryResult),
		};
	} catch (err) {
		console.error('Internal server error:', err);
		return {
			statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
			body: JSON.stringify({ message: 'Internal server error' }),
		};
	}
}
