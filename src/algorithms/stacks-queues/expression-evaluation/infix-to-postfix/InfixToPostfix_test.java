// javac InfixToPostfix.java InfixToPostfix_test.java && java -ea InfixToPostfix_test
public class InfixToPostfix_test {
    public static void main(String[] args) {
        assert InfixToPostfix.infixToPostfix("a+b*(c-d)").equals("a b c d - * +");
        assert InfixToPostfix.infixToPostfix("a+b").equals("a b +");
        assert InfixToPostfix.infixToPostfix("(a+b)*c").equals("a b + c *");
        assert InfixToPostfix.infixToPostfix("a+b+c").equals("a b + c +");
        assert InfixToPostfix.infixToPostfix("a").equals("a");
        assert InfixToPostfix.infixToPostfix("a*b+c").equals("a b * c +");
        assert InfixToPostfix.infixToPostfix("a+b*c").equals("a b c * +");
        assert InfixToPostfix.infixToPostfix("(a+b)*(c+d)").equals("a b + c d + *");
        assert InfixToPostfix.infixToPostfix("a+(b+(c+d))").equals("a b c d + + +");
        assert InfixToPostfix.infixToPostfix("a+b*c-d/e").equals("a b c * + d e / -");

        System.out.println("All tests passed!");
    }
}
