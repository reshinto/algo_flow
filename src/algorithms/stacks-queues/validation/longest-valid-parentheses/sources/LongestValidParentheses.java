// Longest Valid Parentheses — find the length of the longest well-formed parentheses substring
import java.util.ArrayDeque;
import java.util.Deque;

public class LongestValidParentheses {
    public static int longestValidParentheses(String inputString) {
        Deque<Integer> indexStack = new ArrayDeque<>(); // @step:initialize
        indexStack.push(-1); // @step:initialize
        int maxLength = 0; // @step:initialize
        for (int charIdx = 0; charIdx < inputString.length(); charIdx++) {
            char ch = inputString.charAt(charIdx); // @step:visit
            if (ch == '(') {
                indexStack.push(charIdx); // @step:push
            } else {
                // Pop the top; if stack becomes empty, push current index as new base
                indexStack.pop(); // @step:pop
                if (indexStack.isEmpty()) {
                    indexStack.push(charIdx); // @step:push
                } else {
                    // Length of current valid substring = current index minus new stack top
                    int stackTop = indexStack.peek(); // @step:compare
                    int currentLength = charIdx - stackTop; // @step:compare
                    if (currentLength > maxLength) {
                        maxLength = currentLength; // @step:compare
                    }
                }
            }
        }
        return maxLength; // @step:complete
    }
}
