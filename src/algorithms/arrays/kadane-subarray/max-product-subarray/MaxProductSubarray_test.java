public class MaxProductSubarray_test {
    public static void main(String[] args) {
        // result[0]=maxProduct, result[1]=startIndex, result[2]=endIndex
        int[] result1 = MaxProductSubarray.maxProductSubarray(new int[]{2, 3, -2, 4, -1, 2});
        assert result1[0] == 96 : "Expected 96, got " + result1[0];

        int[] result2 = MaxProductSubarray.maxProductSubarray(new int[]{1, 2, 3, 4});
        assert result2[0] == 24 : "Expected 24, got " + result2[0];

        int[] result3 = MaxProductSubarray.maxProductSubarray(new int[]{2, 3, 0, 4, 5});
        assert result3[0] == 20 : "Expected 20, got " + result3[0];

        int[] result4 = MaxProductSubarray.maxProductSubarray(new int[]{7});
        assert result4[0] == 7 && result4[1] == 0 && result4[2] == 0;

        int[] result5 = MaxProductSubarray.maxProductSubarray(new int[]{-2, -3});
        assert result5[0] == 6 : "Expected 6, got " + result5[0];

        int[] result6 = MaxProductSubarray.maxProductSubarray(new int[]{-2, 3, -4});
        assert result6[0] == 24 : "Expected 24, got " + result6[0];

        int[] result7 = MaxProductSubarray.maxProductSubarray(new int[]{});
        assert result7[0] == 0 : "Expected 0, got " + result7[0];

        System.out.println("All tests passed!");
    }
}
