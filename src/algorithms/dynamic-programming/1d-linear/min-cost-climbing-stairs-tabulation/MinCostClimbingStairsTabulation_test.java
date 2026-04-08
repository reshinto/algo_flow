// javac MinCostClimbingStairsTabulation.java MinCostClimbingStairsTabulation_test.java && java -ea MinCostClimbingStairsTabulation_test
public class MinCostClimbingStairsTabulation_test {
    public static void main(String[] args) {
        assert MinCostClimbingStairsTabulation.minCostClimbingStairsTabulation(new int[]{}) == 0 : "empty should return 0";
        assert MinCostClimbingStairsTabulation.minCostClimbingStairsTabulation(new int[]{10, 15}) == 10 : "[10,15] should return 10";
        assert MinCostClimbingStairsTabulation.minCostClimbingStairsTabulation(new int[]{10, 15, 20}) == 15 : "[10,15,20] should return 15";
        assert MinCostClimbingStairsTabulation.minCostClimbingStairsTabulation(new int[]{10, 15, 20, 5, 25, 10}) == 30 : "default input should return 30";
        assert MinCostClimbingStairsTabulation.minCostClimbingStairsTabulation(new int[]{1, 100, 1, 1, 1, 100, 1, 1, 100, 1}) == 6 : "leetcode example should return 6";
        assert MinCostClimbingStairsTabulation.minCostClimbingStairsTabulation(new int[]{5}) == 0 : "[5] should return 0";
        assert MinCostClimbingStairsTabulation.minCostClimbingStairsTabulation(new int[]{3, 3}) == 3 : "[3,3] should return 3";

        System.out.println("All tests passed!");
    }
}
