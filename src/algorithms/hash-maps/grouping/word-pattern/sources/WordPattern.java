// Word Pattern — check if a string follows a pattern using bidirectional hash map mapping
import java.util.HashMap;
import java.util.Map;

public class WordPattern {
    public static boolean wordPattern(String pattern, String sentence) {
        String[] words = sentence.split(" "); // @step:initialize
        Map<Character, String> charToWord = new HashMap<>(); // @step:initialize
        Map<String, Character> wordToChar = new HashMap<>(); // @step:initialize
        if (pattern.length() != words.length) return false; // @step:initialize
        for (int charIndex = 0; charIndex < pattern.length(); charIndex++) {
            char patternChar = pattern.charAt(charIndex);
            String currentWord = words[charIndex];
            String mappedWord = charToWord.get(patternChar); // @step:lookup-key
            Character mappedChar = wordToChar.get(currentWord); // @step:lookup-key
            if (mappedWord == null && mappedChar == null) {
                charToWord.put(patternChar, currentWord); // @step:insert-key
                wordToChar.put(currentWord, patternChar); // @step:insert-key
            } else if (currentWord.equals(mappedWord) && patternChar == mappedChar) {
                continue; // @step:key-found
            } else {
                return false; // @step:key-not-found
            }
        }
        return true; // @step:complete
    }
}
