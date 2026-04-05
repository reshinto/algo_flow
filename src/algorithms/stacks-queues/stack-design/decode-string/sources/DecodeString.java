// Decode String — use a stack to decode encoded strings like "3[a2[c]]" → "accaccacc"
import java.util.ArrayDeque;
import java.util.Deque;

public class DecodeString {
    public static String decodeString(String inputString) {
        Deque<Integer> countStack = new ArrayDeque<>(); // @step:initialize
        Deque<String> stringStack = new ArrayDeque<>(); // @step:initialize
        StringBuilder currentString = new StringBuilder(); // @step:initialize
        int currentCount = 0; // @step:initialize

        for (int charIdx = 0; charIdx < inputString.length(); charIdx++) {
            char currentChar = inputString.charAt(charIdx); // @step:visit

            if (Character.isDigit(currentChar)) {
                // Build up multi-digit multipliers
                currentCount = currentCount * 10 + (currentChar - '0'); // @step:visit
            } else if (currentChar == '[') {
                // Push current context onto stacks and reset for nested segment
                countStack.push(currentCount); // @step:push
                stringStack.push(currentString.toString()); // @step:push
                currentCount = 0; // @step:push
                currentString = new StringBuilder(); // @step:push
            } else if (currentChar == ']') {
                // Pop context and expand the repeated segment
                int repeatCount = countStack.pop(); // @step:pop
                String prevString = stringStack.pop(); // @step:pop
                String repeated = currentString.toString().repeat(repeatCount); // @step:pop
                currentString = new StringBuilder(prevString + repeated); // @step:pop
            } else {
                // Regular character — append to current string accumulator
                currentString.append(currentChar); // @step:visit
            }
        }

        return currentString.toString(); // @step:complete
    }
}
