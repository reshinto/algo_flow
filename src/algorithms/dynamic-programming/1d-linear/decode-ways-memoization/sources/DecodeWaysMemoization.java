// Decode Ways memoization — count decoding possibilities for a digit string top-down
import java.util.HashMap;
import java.util.Map;

public class DecodeWaysMemoization {
    public static int decodeWaysMemoization(String digits) { // @step:initialize
        int digitCount = digits.length(); // @step:initialize
        if (digitCount == 0) return 0; // @step:initialize
        Map<Integer, Integer> memo = new HashMap<>(); // @step:initialize
        return decode(digits, digitCount, memo);
    }

    private static int decode(String digits, int position, Map<Integer, Integer> memo) {
        if (position == 0) return 1; // @step:fill-table
        if (memo.containsKey(position)) return memo.get(position); // @step:read-cache
        // Recursively count ways using single and double digit decoding
        // @step:push-call
        int ways = 0; // @step:compute-cell
        int singleDigit = digits.charAt(position - 1) - '0'; // @step:compute-cell
        if (singleDigit >= 1 && singleDigit <= 9) { // @step:compute-cell
            ways += decode(digits, position - 1, memo); // @step:compute-cell
        }
        if (position >= 2) { // @step:compute-cell
            int twoDigitValue = Integer.parseInt(digits.substring(position - 2, position)); // @step:compute-cell
            if (twoDigitValue >= 10 && twoDigitValue <= 26) { // @step:compute-cell
                ways += decode(digits, position - 2, memo); // @step:compute-cell
            }
        }
        memo.put(position, ways); // @step:compute-cell
        return ways; // @step:pop-call
    }
}
