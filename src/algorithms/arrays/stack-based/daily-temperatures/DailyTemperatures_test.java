import java.util.Arrays;

public class DailyTemperatures_test {
    public static void main(String[] args) {
        // Default input [73,74,75,71,69,72,76,73]
        {
            int[] result = DailyTemperatures.dailyTemperatures(new int[]{73, 74, 75, 71, 69, 72, 76, 73});
            assert Arrays.equals(result, new int[]{1, 1, 4, 2, 1, 1, 0, 0}) : "Default input failed";
        }

        // Strictly decreasing -> all zeros
        {
            int[] result = DailyTemperatures.dailyTemperatures(new int[]{5, 4, 3, 2, 1});
            assert Arrays.equals(result, new int[]{0, 0, 0, 0, 0}) : "Decreasing failed";
        }

        // Strictly increasing -> each waits 1
        {
            int[] result = DailyTemperatures.dailyTemperatures(new int[]{1, 2, 3, 4, 5});
            assert Arrays.equals(result, new int[]{1, 1, 1, 1, 0}) : "Increasing failed";
        }

        // All equal -> all zeros
        {
            int[] result = DailyTemperatures.dailyTemperatures(new int[]{5, 5, 5, 5});
            assert Arrays.equals(result, new int[]{0, 0, 0, 0}) : "All equal failed";
        }

        // Single day
        {
            int[] result = DailyTemperatures.dailyTemperatures(new int[]{72});
            assert Arrays.equals(result, new int[]{0}) : "Single day failed";
        }

        // Empty array
        {
            int[] result = DailyTemperatures.dailyTemperatures(new int[]{});
            assert result.length == 0 : "Empty array failed";
        }

        // Two days: second warmer
        {
            int[] result = DailyTemperatures.dailyTemperatures(new int[]{60, 70});
            assert Arrays.equals(result, new int[]{1, 0}) : "Two days warmer failed";
        }

        // [30,40,50,60]
        {
            int[] result = DailyTemperatures.dailyTemperatures(new int[]{30, 40, 50, 60});
            assert Arrays.equals(result, new int[]{1, 1, 1, 0}) : "Increasing 4 failed";
        }

        System.out.println("All tests passed!");
    }
}
