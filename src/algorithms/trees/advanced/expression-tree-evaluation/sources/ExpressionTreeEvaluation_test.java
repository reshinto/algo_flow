// javac *.java && java -ea ExpressionTreeEvaluation_test
public class ExpressionTreeEvaluation_test {
    public static void main(String[] args) {
        ExpressionTreeEvaluation evaluator = new ExpressionTreeEvaluation();

        assert evaluator.expressionTreeEvaluation("3 4 + 2 * 7 /") == 2 : "Default expression failed";
        assert evaluator.expressionTreeEvaluation("3 4 +") == 7 : "Simple addition failed";
        assert evaluator.expressionTreeEvaluation("5 6 *") == 30 : "Multiplication failed";
        assert evaluator.expressionTreeEvaluation("10 4 -") == 6 : "Subtraction failed";
        assert evaluator.expressionTreeEvaluation("7 2 /") == 3 : "Integer division failed";
        assert evaluator.expressionTreeEvaluation("2 3 * 4 5 * +") == 26 : "Nested expression failed";
        assert evaluator.expressionTreeEvaluation("42") == 42 : "Single number failed";

        System.out.println("All tests passed!");
    }
}
