// javac PerfectSquares.java PerfectSquares_test.java && java -ea PerfectSquares_test
public class PerfectSquares_test {
    public static void main(String[] args) {
        assert PerfectSquares.perfectSquares(12) == 3 : "n=12 should return 3";
        assert PerfectSquares.perfectSquares(13) == 2 : "n=13 should return 2";
        assert PerfectSquares.perfectSquares(1) == 1 : "n=1 should return 1";
        assert PerfectSquares.perfectSquares(4) == 1 : "n=4 should return 1";
        assert PerfectSquares.perfectSquares(7) == 4 : "n=7 should return 4";
        assert PerfectSquares.perfectSquares(0) == 0 : "n=0 should return 0";
        assert PerfectSquares.perfectSquares(9) == 1 : "n=9 should return 1";
        assert PerfectSquares.perfectSquares(5) == 2 : "n=5 should return 2";
        assert PerfectSquares.perfectSquares(11) == 3 : "n=11 should return 3";

        System.out.println("All tests passed!");
    }
}
