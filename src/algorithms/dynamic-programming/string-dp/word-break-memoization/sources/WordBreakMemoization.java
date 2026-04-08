// Word Break memoization — determine if text can be segmented into dictionary words top-down
import java.util.HashMap;
import java.util.Map;

public class WordBreakMemoization {
    public static boolean wordBreakMemoization(String text, String[] dictionary) { // @step:initialize
        int textLength = text.length(); // @step:initialize
        if (textLength == 0) return true; // @step:initialize
        Map<Integer, Boolean> memo = new HashMap<>(); // @step:initialize
        return canBreak(text, dictionary, 0, memo);
    }

    private static boolean canBreak(String text, String[] dictionary, int startIndex, Map<Integer, Boolean> memo) {
        if (startIndex == text.length()) return true; // @step:fill-table
        if (memo.containsKey(startIndex)) return memo.get(startIndex); // @step:read-cache
        // Recursively try each dictionary word starting at this position
        // @step:push-call
        for (String word : dictionary) { // @step:compute-cell
            int endIndex = startIndex + word.length(); // @step:compute-cell
            if (endIndex <= text.length() && text.substring(startIndex, endIndex).equals(word)) { // @step:compute-cell
                if (canBreak(text, dictionary, endIndex, memo)) { // @step:compute-cell
                    memo.put(startIndex, true); // @step:compute-cell
                    return true; // @step:pop-call
                }
            }
        }
        memo.put(startIndex, false); // @step:compute-cell
        return false; // @step:pop-call
    }
}
