import { describe, test, expect } from 'vitest';

// Services
import analyseText from '../../src/services/analyseText';

describe('analyseText', () => {
  test('should return correct summary for basic text', () => {
    const input = 'Hello world';
    
    const result = analyseText(input);

    expect(result.wordCount).toBe(2); 
    expect(result.lineCount).toBe(1);
    expect(result.longestWordLength).toBe(5); 
    expect(result.characterCount).toBe(11);
    expect(result.mostCommonLetter).toBe('l');
  });


    test('should return correct summary for normal text with line breaks', () => {
      const input = `Helllo world
  This is a test
  Analyse me`;
      
      const result = analyseText(input);
  
      expect(result.wordCount).toBe(8); 
      expect(result.lineCount).toBe(3);
      expect(result.longestWordLength).toBe(7); 
      expect(result.characterCount).toBe(42);
      expect(result.mostCommonLetter).toBe('l');
    });
  
    test('should be case-insensitive for mostCommonLetter', () => {
      const input = 'AaBbCcAa';
      const result = analyseText(input);
      expect(result.mostCommonLetter).toBe('a');
    });
  
    test('should ignore non a-z letters for mostCommonLetter', () => {
      const input = '1234567890!@#$%^&*()';
      const result = analyseText(input);
      expect(result.mostCommonLetter).toBe('');
    });
  
    test('should count lines correctly even with trailing newline', () => {
      const input = 'line1\nline2\n';
      const result = analyseText(input);
      expect(result.lineCount).toBe(3);
    });
  
    test('should count words correctly with multiple spaces', () => {
      const input = 'word1   word2 \n  word3';
      const result = analyseText(input);
      expect(result.wordCount).toBe(3);
    });
  });