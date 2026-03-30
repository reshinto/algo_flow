// First Unique Character — find the index of the first non-repeating character in a string
import java.util.HashMap;
import java.util.Map;

public class FirstUniqueCharacter {
    public static int firstUniqueCharacter(String text) {
        Map<Character, Integer> charCounts = new HashMap<>(); // @step:initialize
        for (int charIndex = 0; charIndex < text.length(); charIndex++) {
            char currentChar = text.charAt(charIndex); // @step:increment-count
            charCounts.put(currentChar, charCounts.getOrDefault(currentChar, 0) + 1); // @step:increment-count
        }
        for (int charIndex = 0; charIndex < text.length(); charIndex++) {
            char currentChar = text.charAt(charIndex); // @step:lookup-key
            if (charCounts.get(currentChar) == 1) { // @step:key-found
                return charIndex; // @step:key-found
            }
        }
        return -1; // @step:complete
    }
}
