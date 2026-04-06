// Expression Tree Evaluation — build expression tree from postfix, then evaluate
import java.util.Stack;

class ExprNode {
    String token;
    ExprNode left, right;
    ExprNode(String t) { token = t; }
}

class ExpressionTreeEvaluation {
    private boolean isOperator(String token) {
        return token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/");
    }

    private int evaluate(ExprNode node) {
        if (node == null) return 0;
        if (!isOperator(node.token)) return Integer.parseInt(node.token); // @step:visit
        int leftVal = evaluate(node.left); // @step:traverse-left
        int rightVal = evaluate(node.right); // @step:traverse-right
        switch (node.token) {
            case "+": return leftVal + rightVal; // @step:visit
            case "-": return leftVal - rightVal; // @step:visit
            case "*": return leftVal * rightVal; // @step:visit
            case "/": return leftVal / rightVal; // @step:visit
        }
        return 0;
    }

    public int expressionTreeEvaluation(String expression) {
        String[] tokens = expression.trim().split("\\s+"); // @step:initialize
        Stack<ExprNode> stack = new Stack<>(); // @step:initialize
        for (String token : tokens) {
            if (isOperator(token)) {
                ExprNode rightOperand = stack.pop(); // @step:connect-child
                ExprNode leftOperand = stack.pop(); // @step:connect-child
                ExprNode newNode = new ExprNode(token); // @step:build-node
                newNode.left = leftOperand;
                newNode.right = rightOperand;
                stack.push(newNode); // @step:build-node
            } else {
                stack.push(new ExprNode(token)); // @step:build-node
            }
        }
        return evaluate(stack.peek()); // @step:complete
    }
}
