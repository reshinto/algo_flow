// javac ValidParentheses.java ValidParentheses_test.java && java -ea ValidParentheses_test
public class ValidParentheses_test {
    public static void main(String[] args) {
        assert ValidParentheses.validParentheses("({[]})") == true;
        assert ValidParentheses.validParentheses("()") == true;
        assert ValidParentheses.validParentheses("((()))") == true;
        assert ValidParentheses.validParentheses("()[]{}") == true;
        assert ValidParentheses.validParentheses("(]") == false;
        assert ValidParentheses.validParentheses("([)]") == false;
        assert ValidParentheses.validParentheses("(") == false;
        assert ValidParentheses.validParentheses(")") == false;
        assert ValidParentheses.validParentheses("") == true;
        assert ValidParentheses.validParentheses("({[]})(") == false;

        System.out.println("All tests passed!");
    }
}
