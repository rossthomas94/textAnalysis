const MINIMUM_CHAR_LENGTH = 5;
const MAXIMUM_CHAR_LENGTH = 300;

/**
 *  This function validates the request body of the request.
 *
 * @param {Record<string, unknown>} requestBody - The request body to validate.
 *
 * @throws {Error} - If the request body is invalid.
 * @returns {void} - Returns nothing if the request body is valid.
 */
export default function validateRequestBody(
	requestBody: Record<string, unknown>,
): void {
	const text = requestBody.text;

	if (typeof text !== 'string') {
		throw new Error(
			'Invalid request: "text" field is missing or not a string.',
		);
	}

	const textCharLength = text.trim().length;

	if (!textCharLength) {
		throw new Error('Invalid request: "text" cannot be empty.');
	}

	if (textCharLength < MINIMUM_CHAR_LENGTH) {
		throw new Error('Invalid request: "text" must be at least 5 characters.');
	}

	if (textCharLength > MAXIMUM_CHAR_LENGTH) {
		throw new Error('Invalid request: "text" cannot exceed 300 characters.');
	}

	return;
}
