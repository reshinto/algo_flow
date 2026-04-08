// javac EvaluateReversePolish.java EvaluateReversePolish_test.java && java -ea EvaluateReversePolish_test
public class EvaluateReversePolish_test {
    public static void main(String[] args) {
        assert EvaluateReversePolish.evaluateReversePolish(new String[]{"2", "1", "+", "3", "*"}) == 9;
        assert EvaluateReversePolish.evaluateReversePolish(new String[]{"4", "13", "5", "/", "+"}) == 6;
        assert EvaluateReversePolish.evaluateReversePolish(new String[]{"10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"}) == 22;
        assert EvaluateReversePolish.evaluateReversePolish(new String[]{"42"}) == 42;
        assert EvaluateReversePolish.evaluateReversePolish(new String[]{"3", "4", "+"}) == 7;
        assert EvaluateReversePolish.evaluateReversePolish(new String[]{"10", "3", "-"}) == 7;
        assert EvaluateReversePolish.evaluateReversePolish(new String[]{"5", "6", "*"}) == 30;
        assert EvaluateReversePolish.evaluateReversePolish(new String[]{"7", "2", "/"}) == 3;
        assert EvaluateReversePolish.evaluateReversePolish(new String[]{"7", "-3", "/"}) == -2;
        assert EvaluateReversePolish.evaluateReversePolish(new String[]{"-3", "4", "*"}) == -12;
        assert EvaluateReversePolish.evaluateReversePolish(new String[]{"2", "3", "+", "4", "1", "-", "*"}) == 15;

        System.out.println("All tests passed!");
    }
}
