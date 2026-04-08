// javac IntegerBreakMemoization.java IntegerBreakMemoization_test.java && java -ea IntegerBreakMemoization_test
public class IntegerBreakMemoization_test {
    public static void main(String[] args) {
        assert IntegerBreakMemoization.integerBreakMemoization(2) == 1 : "n=2 should return 1";
        assert IntegerBreakMemoization.integerBreakMemoization(3) == 2 : "n=3 should return 2";
        assert IntegerBreakMemoization.integerBreakMemoization(4) == 4 : "n=4 should return 4";
        assert IntegerBreakMemoization.integerBreakMemoization(5) == 6 : "n=5 should return 6";
        assert IntegerBreakMemoization.integerBreakMemoization(6) == 9 : "n=6 should return 9";
        assert IntegerBreakMemoization.integerBreakMemoization(8) == 18 : "n=8 should return 18";
        assert IntegerBreakMemoization.integerBreakMemoization(10) == 36 : "n=10 should return 36";
        assert IntegerBreakMemoization.integerBreakMemoization(13) == 108 : "n=13 should return 108";

        System.out.println("All tests passed!");
    }
}
