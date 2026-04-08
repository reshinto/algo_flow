public class FindMissingNumber_test {
    public static void main(String[] args) {
        // [3,0,1] -> 2
        int[] result1 = FindMissingNumber.findMissingNumber(new int[]{3, 0, 1});
        assert result1[0] == 2 : "Expected 2, got " + result1[0];

        // Missing zero [1,2,3] -> 0
        int[] result2 = FindMissingNumber.findMissingNumber(new int[]{1, 2, 3});
        assert result2[0] == 0 : "Expected 0, got " + result2[0];

        // Missing n [0,1,2] -> 3
        int[] result3 = FindMissingNumber.findMissingNumber(new int[]{0, 1, 2});
        assert result3[0] == 3 : "Expected 3, got " + result3[0];

        // Single element [0] -> 1
        int[] result4 = FindMissingNumber.findMissingNumber(new int[]{0});
        assert result4[0] == 1 : "Expected 1, got " + result4[0];

        // Single element [1] -> 0
        int[] result5 = FindMissingNumber.findMissingNumber(new int[]{1});
        assert result5[0] == 0 : "Expected 0, got " + result5[0];

        // Empty array -> 0
        int[] result6 = FindMissingNumber.findMissingNumber(new int[]{});
        assert result6[0] == 0 : "Expected 0, got " + result6[0];

        // Missing 4 in larger array
        int[] result7 = FindMissingNumber.findMissingNumber(new int[]{0, 1, 2, 3, 5, 6, 7, 8, 9});
        assert result7[0] == 4 : "Expected 4, got " + result7[0];

        System.out.println("All tests passed!");
    }
}
