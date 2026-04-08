// javac TribonacciMemoization.java TribonacciMemoization_test.java && java -ea TribonacciMemoization_test
public class TribonacciMemoization_test {
    public static void main(String[] args) {
        assert TribonacciMemoization.tribonacciMemoization(0) == 0 : "T(0) should be 0";
        assert TribonacciMemoization.tribonacciMemoization(1) == 1 : "T(1) should be 1";
        assert TribonacciMemoization.tribonacciMemoization(2) == 1 : "T(2) should be 1";
        assert TribonacciMemoization.tribonacciMemoization(4) == 4 : "T(4) should be 4";
        assert TribonacciMemoization.tribonacciMemoization(7) == 24 : "T(7) should be 24";
        assert TribonacciMemoization.tribonacciMemoization(10) == 149 : "T(10) should be 149";

        int[] expected = {0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149};
        for (int targetIndex = 0; targetIndex <= 10; targetIndex++) {
            assert TribonacciMemoization.tribonacciMemoization(targetIndex) == expected[targetIndex]
                : "T(" + targetIndex + ") expected " + expected[targetIndex];
        }

        System.out.println("All tests passed!");
    }
}
