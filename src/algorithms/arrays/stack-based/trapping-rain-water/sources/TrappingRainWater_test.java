public class TrappingRainWater_test {
    public static void main(String[] args) {
        // Classic example -> 6 total units
        {
            int[] result = TrappingRainWater.trappingRainWater(new int[]{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1});
            assert result[0] == 6 : "Expected totalWater=6, got " + result[0];
        }

        // Empty array -> 0
        {
            int[] result = TrappingRainWater.trappingRainWater(new int[]{});
            assert result[0] == 0 : "Expected totalWater=0 for empty, got " + result[0];
        }

        // Increasing -> 0
        {
            int[] result = TrappingRainWater.trappingRainWater(new int[]{1, 2, 3, 4, 5});
            assert result[0] == 0 : "Expected totalWater=0 for increasing, got " + result[0];
        }

        // Decreasing -> 0
        {
            int[] result = TrappingRainWater.trappingRainWater(new int[]{5, 4, 3, 2, 1});
            assert result[0] == 0 : "Expected totalWater=0 for decreasing, got " + result[0];
        }

        // All zeros -> 0
        {
            int[] result = TrappingRainWater.trappingRainWater(new int[]{0, 0, 0});
            assert result[0] == 0 : "Expected totalWater=0 for all zeros, got " + result[0];
        }

        // Single element -> 0
        {
            int[] result = TrappingRainWater.trappingRainWater(new int[]{5});
            assert result[0] == 0 : "Expected totalWater=0 for single element, got " + result[0];
        }

        // Multiple valleys [4,2,0,3,2,5] -> 9 total
        {
            int[] result = TrappingRainWater.trappingRainWater(new int[]{4, 2, 0, 3, 2, 5});
            assert result[0] == 9 : "Expected totalWater=9, got " + result[0];
        }

        System.out.println("All tests passed!");
    }
}
