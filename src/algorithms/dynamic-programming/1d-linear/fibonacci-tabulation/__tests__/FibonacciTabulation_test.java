// javac FibonacciTabulation.java FibonacciTabulation_test.java && java -ea FibonacciTabulation_test
public class FibonacciTabulation_test {
    public static void main(String[] args) {
        assert FibonacciTabulation.fibonacciTabulation(0) == 0 : "F(0) should be 0";
        assert FibonacciTabulation.fibonacciTabulation(1) == 1 : "F(1) should be 1";
        assert FibonacciTabulation.fibonacciTabulation(2) == 1 : "F(2) should be 1";
        assert FibonacciTabulation.fibonacciTabulation(8) == 21 : "F(8) should be 21";
        assert FibonacciTabulation.fibonacciTabulation(10) == 55 : "F(10) should be 55";
        assert FibonacciTabulation.fibonacciTabulation(15) == 610 : "F(15) should be 610";

        System.out.println("All tests passed!");
    }
}
