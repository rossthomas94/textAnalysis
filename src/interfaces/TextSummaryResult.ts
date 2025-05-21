export interface TextSummaryResult {
	wordCount: number;
	characterCount: number;
	lineCount: number;
	longestWordLength: number; // Changed from longestWordCount to longestWordLength for clarity
	mostCommonLetter: string;
}
