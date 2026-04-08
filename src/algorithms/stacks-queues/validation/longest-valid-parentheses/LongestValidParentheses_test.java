// javac LongestValidParentheses.java LongestValidParentheses_test.java && java -ea LongestValidParentheses_test
public class LongestValidParentheses_test {
    public static void main(String[] args) {
        assert LongestValidParentheses.longestValidParentheses("(()") == 2;
        assert LongestValidParentheses.longestValidParentheses(")()())") == 4;
        assert LongestValidParentheses.longestValidParentheses("") == 0;
        assert LongestValidParentheses.longestValidParentheses("(()())") == 6;
        assert LongestValidParentheses.longestValidParentheses("()()") == 4;
        assert LongestValidParentheses.longestValidParentheses("(((") == 0;

        System.out.println("All tests passed!");
    }
}
