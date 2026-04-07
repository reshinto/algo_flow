// javac TribonacciTabulation.java TribonacciTabulation_test.java && java -ea TribonacciTabulation_test
public class TribonacciTabulation_test {
    public static void main(String[] args) {
        assert TribonacciTabulation.tribonacciTabulation(0) == 0 : "T(0) should be 0";
        assert TribonacciTabulation.tribonacciTabulation(1) == 1 : "T(1) should be 1";
        assert TribonacciTabulation.tribonacciTabulation(2) == 1 : "T(2) should be 1";
        assert TribonacciTabulation.tribonacciTabulation(4) == 4 : "T(4) should be 4";
        assert TribonacciTabulation.tribonacciTabulation(7) == 24 : "T(7) should be 24";
        assert TribonacciTabulation.tribonacciTabulation(10) == 149 : "T(10) should be 149";

        System.out.println("All tests passed!");
    }
}
