// Remove K Digits — greedy monotonic stack to produce the smallest number after k removals
import java.util.ArrayDeque;
import java.util.Deque;

public class RemoveKDigits {
    public static String removeKDigits(String num, int removalCount) {
        Deque<Character> digitStack = new ArrayDeque<>(); // @step:initialize
        int removalsLeft = removalCount; // @step:initialize

        for (int digitIdx = 0; digitIdx < num.length(); digitIdx++) {
            char currentDigit = num.charAt(digitIdx); // @step:visit
            // While we still have removals and the stack top is greater than the current digit, pop it
            while (removalsLeft > 0 && !digitStack.isEmpty() && digitStack.peek() > currentDigit) { // @step:compare
                digitStack.pop(); // @step:pop
                removalsLeft--; // @step:maintain-monotonic
            }
            digitStack.push(currentDigit); // @step:push
        }

        // Remove remaining digits from the end if we still have removals left
        while (removalsLeft > 0) {
            digitStack.pop(); // @step:pop
            removalsLeft--; // @step:complete
        }

        // Build result string, strip leading zeros, default to "0"
        StringBuilder sb = new StringBuilder();
        for (char ch : digitStack) sb.append(ch); // @step:complete
        String result = sb.reverse().toString().replaceAll("^0+", ""); // @step:complete
        return result.isEmpty() ? "0" : result; // @step:complete
    }
}
