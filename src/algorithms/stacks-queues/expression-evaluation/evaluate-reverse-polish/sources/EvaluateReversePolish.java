// Evaluate Reverse Polish Notation — push operands, pop two and compute on operators
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Set;

public class EvaluateReversePolish {
    public static int evaluateReversePolish(String[] tokens) {
        Deque<Integer> operandStack = new ArrayDeque<>(); // @step:initialize
        Set<String> operators = Set.of("+", "-", "*", "/"); // @step:initialize
        for (String currentToken : tokens) { // @step:visit
            if (operators.contains(currentToken)) {
                int operandB = operandStack.pop(); // @step:evaluate
                int operandA = operandStack.pop(); // @step:evaluate
                int result;
                if (currentToken.equals("+")) result = operandA + operandB; // @step:evaluate
                else if (currentToken.equals("-")) result = operandA - operandB; // @step:evaluate
                else if (currentToken.equals("*")) result = operandA * operandB; // @step:evaluate
                else result = (int) (operandA / (double) operandB); // @step:evaluate
                operandStack.push(result); // @step:push
            } else {
                operandStack.push(Integer.parseInt(currentToken)); // @step:push
            }
        }
        return operandStack.peek(); // @step:complete
    }
}
