// Backspace String Compare — use a stack to process each string, treating '#' as backspace
import java.util.ArrayDeque;
import java.util.Deque;

public class BackspaceStringCompare {
    private static Deque<Character> processWithBackspace(String inputStr) {
        Deque<Character> resultStack = new ArrayDeque<>(); // @step:initialize
        for (int charIdx = 0; charIdx < inputStr.length(); charIdx++) {
            char ch = inputStr.charAt(charIdx); // @step:visit
            if (ch == '#') {
                if (!resultStack.isEmpty()) {
                    resultStack.pop(); // @step:pop
                }
            } else {
                resultStack.push(ch); // @step:push
            }
        }
        return resultStack; // @step:compare
    }

    public static boolean backspaceStringCompare(String firstString, String secondString) {
        Deque<Character> processedFirst = processWithBackspace(firstString); // @step:initialize
        Deque<Character> processedSecond = processWithBackspace(secondString); // @step:initialize
        if (processedFirst.size() != processedSecond.size()) { // @step:compare
            return false; // @step:compare
        }
        while (!processedFirst.isEmpty()) { // @step:compare
            if (!processedFirst.pop().equals(processedSecond.pop())) { // @step:compare
                return false; // @step:compare
            }
        }
        return true; // @step:complete
    }
}
