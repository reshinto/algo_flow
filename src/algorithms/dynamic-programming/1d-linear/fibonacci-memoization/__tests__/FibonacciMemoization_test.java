// javac FibonacciMemoization.java FibonacciMemoization_test.java && java -ea FibonacciMemoization_test
public class FibonacciMemoization_test {
    public static void main(String[] args) {
        assert FibonacciMemoization.fibonacciMemoization(0) == 0 : "F(0) should be 0";
        assert FibonacciMemoization.fibonacciMemoization(1) == 1 : "F(1) should be 1";
        assert FibonacciMemoization.fibonacciMemoization(2) == 1 : "F(2) should be 1";
        assert FibonacciMemoization.fibonacciMemoization(8) == 21 : "F(8) should be 21";
        assert FibonacciMemoization.fibonacciMemoization(10) == 55 : "F(10) should be 55";
        assert FibonacciMemoization.fibonacciMemoization(15) == 610 : "F(15) should be 610";

        int[] expected = {0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55};
        for (int targetIndex = 0; targetIndex <= 10; targetIndex++) {
            assert FibonacciMemoization.fibonacciMemoization(targetIndex) == expected[targetIndex]
                : "F(" + targetIndex + ") expected " + expected[targetIndex];
        }

        System.out.println("All tests passed!");
    }
}
