// Infix to Postfix — Dijkstra's Shunting-Yard: convert infix expression to postfix (RPN)
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class InfixToPostfix {
    public static String infixToPostfix(String expression) {
        Map<String, Integer> operatorPrecedence = Map.of("+", 1, "-", 1, "*", 2, "/", 2); // @step:initialize
        List<String> outputQueue = new ArrayList<>(); // @step:initialize
        Deque<String> operatorStack = new ArrayDeque<>(); // @step:initialize

        // Tokenize: extract operands, operators, and parentheses
        Pattern tokenPattern = Pattern.compile("[A-Za-z0-9]+|[+\\-*/()]"); // @step:initialize
        Matcher matcher = tokenPattern.matcher(expression);
        List<String> tokens = new ArrayList<>();
        while (matcher.find()) tokens.add(matcher.group());

        for (String currentToken : tokens) { // @step:visit
            if (currentToken.matches("[A-Za-z0-9]+")) {
                // Operand — send directly to output
                outputQueue.add(currentToken); // @step:output
            } else if (operatorPrecedence.containsKey(currentToken)) {
                // Operator — pop higher/equal-precedence operators to output first
                while ( // @step:compare
                    !operatorStack.isEmpty()
                    && !operatorStack.peek().equals("(")
                    && operatorPrecedence.getOrDefault(operatorStack.peek(), 0)
                       >= operatorPrecedence.getOrDefault(currentToken, 0)
                ) {
                    outputQueue.add(operatorStack.pop()); // @step:pop
                }
                operatorStack.push(currentToken); // @step:push
            } else if (currentToken.equals("(")) {
                operatorStack.push(currentToken); // @step:push
            } else if (currentToken.equals(")")) {
                // Pop to output until matching '(' is found
                while (!operatorStack.isEmpty() && !operatorStack.peek().equals("(")) {
                    outputQueue.add(operatorStack.pop()); // @step:pop
                }
                operatorStack.pop(); // @step:pop — discard the '('
            }
        }

        // Drain remaining operators to output
        while (!operatorStack.isEmpty()) {
            outputQueue.add(operatorStack.pop()); // @step:pop
        }

        return String.join(" ", outputQueue); // @step:complete
    }
}
