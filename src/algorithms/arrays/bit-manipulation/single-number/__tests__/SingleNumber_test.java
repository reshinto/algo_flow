public class SingleNumber_test {
    public static void main(String[] args) {
        // Basic array [4,1,2,1,2] -> 4
        int[] result1 = SingleNumber.singleNumber(new int[]{4, 1, 2, 1, 2});
        assert result1[0] == 4 : "Expected 4, got " + result1[0];

        // Single element [42] -> 42
        int[] result2 = SingleNumber.singleNumber(new int[]{42});
        assert result2[0] == 42 : "Expected 42, got " + result2[0];

        // Unique at end [1,1,2,2,3] -> 3
        int[] result3 = SingleNumber.singleNumber(new int[]{1, 1, 2, 2, 3});
        assert result3[0] == 3 : "Expected 3, got " + result3[0];

        // Unique at start [5,3,3,7,7] -> 5
        int[] result4 = SingleNumber.singleNumber(new int[]{5, 3, 3, 7, 7});
        assert result4[0] == 5 : "Expected 5, got " + result4[0];

        // Empty array -> 0
        int[] result5 = SingleNumber.singleNumber(new int[]{});
        assert result5[0] == 0 : "Expected 0, got " + result5[0];

        // Negative numbers [-1,2,-1] -> 2
        int[] result6 = SingleNumber.singleNumber(new int[]{-1, 2, -1});
        assert result6[0] == 2 : "Expected 2, got " + result6[0];

        // Larger array with unique at position 5
        int[] result7 = SingleNumber.singleNumber(new int[]{1, 2, 3, 4, 5, 99, 5, 4, 3, 2, 1});
        assert result7[0] == 99 : "Expected 99, got " + result7[0];

        // Unique element of value 0
        int[] result8 = SingleNumber.singleNumber(new int[]{1, 2, 1, 2, 0});
        assert result8[0] == 0 : "Expected 0, got " + result8[0];

        System.out.println("All tests passed!");
    }
}
