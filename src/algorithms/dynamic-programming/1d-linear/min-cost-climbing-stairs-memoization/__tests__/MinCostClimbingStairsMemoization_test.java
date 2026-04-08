// javac MinCostClimbingStairsMemoization.java MinCostClimbingStairsMemoization_test.java && java -ea MinCostClimbingStairsMemoization_test
public class MinCostClimbingStairsMemoization_test {
    public static void main(String[] args) {
        assert MinCostClimbingStairsMemoization.minCostClimbingStairsMemoization(new int[]{}) == 0 : "empty should return 0";
        assert MinCostClimbingStairsMemoization.minCostClimbingStairsMemoization(new int[]{10}) == 0 : "[10] should return 0";
        assert MinCostClimbingStairsMemoization.minCostClimbingStairsMemoization(new int[]{10, 15}) == 10 : "[10,15] should return 10";
        assert MinCostClimbingStairsMemoization.minCostClimbingStairsMemoization(new int[]{10, 15, 20}) == 15 : "[10,15,20] should return 15";
        assert MinCostClimbingStairsMemoization.minCostClimbingStairsMemoization(new int[]{10, 15, 20, 5, 25, 10}) == 30 : "default input should return 30";
        assert MinCostClimbingStairsMemoization.minCostClimbingStairsMemoization(new int[]{1, 100, 1, 1, 1, 100, 1, 1, 100, 1}) == 6 : "leetcode example should return 6";

        System.out.println("All tests passed!");
    }
}
