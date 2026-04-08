public class LongestKDistinct_test {
    public static void main(String[] args) {
        // result[0]=maxLength, result[1]=startIndex
        int[] result1 = LongestKDistinct.longestKDistinct(new int[]{1, 2, 1, 2, 3, 3, 4, 1}, 2);
        assert result1[0] == 4 : "Expected maxLength=4, got " + result1[0];

        int[] result2 = LongestKDistinct.longestKDistinct(new int[]{1, 2, 2, 3, 3, 3}, 1);
        assert result2[0] == 3 && result2[1] == 3;

        int[] result3 = LongestKDistinct.longestKDistinct(new int[]{1, 2, 3}, 5);
        assert result3[0] == 3 && result3[1] == 0;

        int[] result4 = LongestKDistinct.longestKDistinct(new int[]{2, 2, 2, 2}, 2);
        assert result4[0] == 4 && result4[1] == 0;

        int[] result5 = LongestKDistinct.longestKDistinct(new int[]{1, 2, 3}, 0);
        assert result5[0] == 0;

        int[] result6 = LongestKDistinct.longestKDistinct(new int[]{}, 2);
        assert result6[0] == 0;

        int[] result7 = LongestKDistinct.longestKDistinct(new int[]{7}, 1);
        assert result7[0] == 1 && result7[1] == 0;

        System.out.println("All tests passed!");
    }
}
