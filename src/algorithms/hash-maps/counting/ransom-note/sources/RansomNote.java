// Ransom Note — check if a ransom note can be constructed from magazine characters
import java.util.HashMap;
import java.util.Map;

public class RansomNote {
    public static boolean ransomNote(String ransomNoteText, String magazine) {
        Map<Character, Integer> charCounts = new HashMap<>(); // @step:initialize
        for (int charIndex = 0; charIndex < magazine.length(); charIndex++) {
            char currentChar = magazine.charAt(charIndex); // @step:increment-count
            charCounts.put(currentChar, charCounts.getOrDefault(currentChar, 0) + 1); // @step:increment-count
        }
        for (int charIndex = 0; charIndex < ransomNoteText.length(); charIndex++) {
            char currentChar = ransomNoteText.charAt(charIndex); // @step:decrement-count
            int updatedCount = charCounts.getOrDefault(currentChar, 0) - 1; // @step:decrement-count
            if (updatedCount < 0) return false; // @step:complete
            charCounts.put(currentChar, updatedCount); // @step:decrement-count
        }
        return true; // @step:complete
    }
}
