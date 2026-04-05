// Min Remove to Make Valid — use a stack of indices to track unmatched '(' and a set for unmatched ')'
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

public class MinRemoveToMakeValid {
    public static String minRemoveToMakeValid(String inputString) {
        Deque<Integer> unmatchedOpenIndices = new ArrayDeque<>(); // @step:initialize
        Set<Integer> unmatchedCloseIndices = new HashSet<>(); // @step:initialize
        for (int charIdx = 0; charIdx < inputString.length(); charIdx++) {
            char ch = inputString.charAt(charIdx); // @step:visit
            if (ch == '(') {
                unmatchedOpenIndices.push(charIdx); // @step:push
            } else if (ch == ')') {
                if (!unmatchedOpenIndices.isEmpty()) {
                    unmatchedOpenIndices.pop(); // @step:pop
                } else {
                    unmatchedCloseIndices.add(charIdx); // @step:mismatch
                }
            }
        }
        // Remaining indices in the stack are unmatched opening brackets
        Set<Integer> unmatchedIndices = new HashSet<>(unmatchedCloseIndices); // @step:mismatch
        unmatchedIndices.addAll(unmatchedOpenIndices); // @step:mismatch
        StringBuilder result = new StringBuilder(); // @step:complete
        for (int charIdx = 0; charIdx < inputString.length(); charIdx++) {
            if (!unmatchedIndices.contains(charIdx)) {
                result.append(inputString.charAt(charIdx)); // @step:complete
            }
        }
        return result.toString(); // @step:complete
    }
}
