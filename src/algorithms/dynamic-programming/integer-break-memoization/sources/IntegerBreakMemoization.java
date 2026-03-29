// Integer Break memoization — top-down recursion to maximize product of parts
import java.util.HashMap;
import java.util.Map;

public class IntegerBreakMemoization {
    public static int integerBreakMemoization(int targetNumber) { // @step:initialize
        if (targetNumber == 1) return 1; // @step:initialize
        Map<Integer, Integer> memo = new HashMap<>(); // @step:initialize
        return maxProduct(targetNumber, memo);
    }

    private static int maxProduct(int targetNumber, Map<Integer, Integer> memo) {
        if (targetNumber == 1) return 1; // @step:initialize
        if (memo.containsKey(targetNumber)) return memo.get(targetNumber); // @step:read-cache
        // Recursively compute the maximum product and cache the result
        // @step:push-call
        int best = 0; // @step:compute-cell
        for (int partSize = 1; partSize < targetNumber; partSize++) { // @step:compute-cell
            int remainder = targetNumber - partSize; // @step:compute-cell
            int splitProduct = partSize * remainder; // @step:compute-cell
            int recurseProduct = partSize * maxProduct(remainder, memo); // @step:compute-cell
            best = Math.max(best, Math.max(splitProduct, recurseProduct)); // @step:compute-cell
        }
        memo.put(targetNumber, best); // @step:compute-cell
        return best; // @step:pop-call
    }
}
