// Find the Difference — find the extra character added to the modified string
import java.util.HashMap;

public class FindTheDifference {
    public static char findTheDifference(String original, String modified) {
        HashMap<Character, Integer> charCounts = new HashMap<>(); // @step:initialize
        for (int charIndex = 0; charIndex < original.length(); charIndex++) {
            char currentChar = original.charAt(charIndex);
            charCounts.put(currentChar, charCounts.getOrDefault(currentChar, 0) + 1); // @step:increment-count
        }
        for (int charIndex = 0; charIndex < modified.length(); charIndex++) {
            char currentChar = modified.charAt(charIndex);
            int count = charCounts.getOrDefault(currentChar, 0) - 1; // @step:decrement-count
            charCounts.put(currentChar, count);
            if (count < 0) return currentChar; // @step:key-found
        }
        return '\0'; // @step:complete
    }
}
