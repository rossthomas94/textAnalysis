// Interface
import type { TextSummaryResult } from '../interfaces/TextSummaryResult';

const NEW_LINE_REGEX = /\r?\n/;
const WHITESPACE_REGEX = /\s+/;
const LETTER_START = 'a';
const LETTER_END = 'z';

/**
 * Analyses the given text and returns a summary of its characteristics.
 *
 * @param {string} text - The text to analyse.
 *
 * @returns {TextSummaryResult} An object containing the analysis results.
 */
export default function analyseText(text: string): TextSummaryResult {
	const words = text.trim().split(WHITESPACE_REGEX).filter(Boolean);
	const lines = text.split(NEW_LINE_REGEX);

	const frequencyStats = [...text.toLowerCase()].reduce(
		(acc, char) => {
		  if (char >= LETTER_START && char <= LETTER_END) {
			const freq = (acc.freqMap.get(char) ?? 0) + 1;
			acc.freqMap.set(char, freq);
			if (freq > acc.max.freq) {
				acc.max = { char, freq }
			};
		  }
		  return acc;
		},
		{
		  freqMap: new Map<string, number>(),
		  max: { char: '', freq: 0 },
		}
	  );

	return {
		wordCount: words.length,
		characterCount: text.length,
		lineCount: lines.length,
		longestWordLength: words.reduce((max, word) => Math.max(max, word.length), 0),
		mostCommonLetter: frequencyStats.max.char,
	};
}
