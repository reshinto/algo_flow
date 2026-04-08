// javac ClimbingStairsMemoization.java ClimbingStairsMemoization_test.java && java -ea ClimbingStairsMemoization_test
public class ClimbingStairsMemoization_test {
    public static void main(String[] args) {
        assert ClimbingStairsMemoization.climbingStairsMemoization(0) == 1 : "0 stairs should return 1";
        assert ClimbingStairsMemoization.climbingStairsMemoization(1) == 1 : "1 stair should return 1";
        assert ClimbingStairsMemoization.climbingStairsMemoization(2) == 2 : "2 stairs should return 2";
        assert ClimbingStairsMemoization.climbingStairsMemoization(3) == 3 : "3 stairs should return 3";
        assert ClimbingStairsMemoization.climbingStairsMemoization(4) == 5 : "4 stairs should return 5";
        assert ClimbingStairsMemoization.climbingStairsMemoization(6) == 13 : "6 stairs should return 13";
        assert ClimbingStairsMemoization.climbingStairsMemoization(7) == 21 : "7 stairs should return 21";

        int[] expected = {1, 1, 2, 3, 5, 8, 13, 21};
        for (int stairCount = 0; stairCount <= 7; stairCount++) {
            assert ClimbingStairsMemoization.climbingStairsMemoization(stairCount) == expected[stairCount]
                : "stairs=" + stairCount + " expected " + expected[stairCount];
        }

        System.out.println("All tests passed!");
    }
}
