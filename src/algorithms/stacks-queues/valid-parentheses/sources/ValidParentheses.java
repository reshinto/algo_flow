// Valid Parentheses — use a stack to verify every opening bracket has a matching closing bracket
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;

public class ValidParentheses {
    public static boolean validParentheses(String inputString) {
        Deque<Character> stack = new ArrayDeque<>(); // @step:initialize
        Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{'); // @step:initialize
        for (int charIdx = 0; charIdx < inputString.length(); charIdx++) {
            char ch = inputString.charAt(charIdx); // @step:push,pop
            if (ch == '(' || ch == '[' || ch == '{') {
                stack.push(ch); // @step:push
            } else {
                // Closing bracket — check that stack top matches the expected opening bracket
                if (stack.isEmpty() || stack.peek() != pairs.get(ch)) { // @step:mismatch
                    return false; // @step:mismatch
                }
                stack.pop(); // @step:pop
            }
        }
        // Valid only if every opened bracket was closed
        return stack.isEmpty(); // @step:complete
    }
}
