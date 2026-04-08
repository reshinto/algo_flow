// javac UniquePaths.java UniquePaths_test.java && java -ea UniquePaths_test
public class UniquePaths_test {
    public static void main(String[] args) {
        assert UniquePaths.uniquePaths(3, 7) == 28 : "3x7 grid should return 28";
        assert UniquePaths.uniquePaths(1, 1) == 1 : "1x1 grid should return 1";
        assert UniquePaths.uniquePaths(3, 2) == 3 : "3x2 grid should return 3";
        assert UniquePaths.uniquePaths(3, 3) == 6 : "3x3 grid should return 6";
        assert UniquePaths.uniquePaths(1, 5) == 1 : "single row should return 1";
        assert UniquePaths.uniquePaths(5, 1) == 1 : "single column should return 1";
        assert UniquePaths.uniquePaths(5, 5) == 70 : "5x5 grid should return 70";
        assert UniquePaths.uniquePaths(7, 7) == 924 : "7x7 grid should return 924";

        System.out.println("All tests passed!");
    }
}
