// Remove All Adjacent Duplicates — use a stack to repeatedly remove adjacent duplicate pairs
import java.util.ArrayDeque;
import java.util.Deque;

public class RemoveAllAdjacentDuplicates {
    public static String removeAllAdjacentDuplicates(String inputString) {
        Deque<Character> stack = new ArrayDeque<>(); // @step:initialize
        for (int charIdx = 0; charIdx < inputString.length(); charIdx++) {
            char ch = inputString.charAt(charIdx); // @step:visit
            Character stackTop = stack.isEmpty() ? null : stack.peek(); // @step:visit
            if (!stack.isEmpty() && stackTop != null && stackTop == ch) {
                stack.pop(); // @step:match
            } else {
                stack.push(ch); // @step:push
            }
        }
        // Remaining stack characters form the result after all duplicate pairs removed
        StringBuilder result = new StringBuilder();
        while (!stack.isEmpty()) {
            result.insert(0, stack.pop()); // @step:complete
        }
        return result.toString(); // @step:complete
    }
}
