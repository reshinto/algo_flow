// javac IntegerBreakTabulation.java IntegerBreakTabulation_test.java && java -ea IntegerBreakTabulation_test
public class IntegerBreakTabulation_test {
    public static void main(String[] args) {
        assert IntegerBreakTabulation.integerBreakTabulation(2) == 1 : "n=2 should return 1";
        assert IntegerBreakTabulation.integerBreakTabulation(3) == 2 : "n=3 should return 2";
        assert IntegerBreakTabulation.integerBreakTabulation(4) == 4 : "n=4 should return 4";
        assert IntegerBreakTabulation.integerBreakTabulation(5) == 6 : "n=5 should return 6";
        assert IntegerBreakTabulation.integerBreakTabulation(6) == 9 : "n=6 should return 9";
        assert IntegerBreakTabulation.integerBreakTabulation(8) == 18 : "n=8 should return 18";
        assert IntegerBreakTabulation.integerBreakTabulation(10) == 36 : "n=10 should return 36";

        System.out.println("All tests passed!");
    }
}
