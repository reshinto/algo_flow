// javac BasicCalculator.java BasicCalculator_test.java && java -ea BasicCalculator_test
public class BasicCalculator_test {
    public static void main(String[] args) {
        BasicCalculator solution = new BasicCalculator();

        assert solution.basicCalculator("1 + 1") == 2;
        assert solution.basicCalculator(" 2-1 + 2 ") == 3;
        assert solution.basicCalculator("(1+(4+5+2)-3)+(6+8)") == 23;
        assert solution.basicCalculator("1 + (2 - 3)") == 0;
        assert solution.basicCalculator("42") == 42;
        assert solution.basicCalculator("10 - 3") == 7;
        assert solution.basicCalculator("(((1 + 2)))") == 3;
        assert solution.basicCalculator("1 - (2 + 3)") == -4;

        System.out.println("All tests passed!");
    }
}
