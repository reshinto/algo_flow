// Basic Calculator — evaluate a simple expression string with +, -, (, ) using a stack for sign propagation
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.ArrayList;
import java.util.List;

class BasicCalculator {
    public int basicCalculator(String expression) {
        Deque<Integer> signStack = new ArrayDeque<>(); // @step:initialize
        int runningTotal = 0; // @step:initialize
        int currentSign = 1; // @step:initialize

        List<String> tokens = tokenize(expression); // @step:initialize

        for (String currentToken : tokens) { // @step:visit
            if (currentToken.matches("\\d+")) {
                runningTotal += currentSign * Integer.parseInt(currentToken); // @step:evaluate
            } else if (currentToken.equals("+")) {
                currentSign = 1; // @step:visit
            } else if (currentToken.equals("-")) {
                currentSign = -1; // @step:visit
            } else if (currentToken.equals("(")) {
                // Save current running total and sign, then reset for the sub-expression
                signStack.push(runningTotal); // @step:push
                signStack.push(currentSign); // @step:push
                runningTotal = 0; // @step:push
                currentSign = 1; // @step:push
            } else if (currentToken.equals(")")) {
                // Pop sign and previous total, merge sub-expression result into parent context
                int poppedSign = signStack.pop(); // @step:pop
                int prevTotal = signStack.pop(); // @step:pop
                runningTotal = prevTotal + poppedSign * runningTotal; // @step:pop
            }
        }

        return runningTotal; // @step:complete
    }

    private List<String> tokenize(String expression) {
        List<String> tokens = new ArrayList<>();
        Matcher matcher = Pattern.compile("\\d+|[+\\-()]").matcher(expression);
        while (matcher.find()) {
            tokens.add(matcher.group());
        }
        return tokens;
    }
}
