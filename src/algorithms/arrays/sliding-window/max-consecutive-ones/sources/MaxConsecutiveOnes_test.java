public class MaxConsecutiveOnes_test {
    public static void main(String[] args) {
        // result[0]=maxLength, result[1]=startIndex
        int[] result1 = MaxConsecutiveOnes.maxConsecutiveOnes(new int[]{1, 1, 0, 0, 1, 1, 1, 0, 1, 1}, 2);
        assert result1[0] == 7 && result1[1] == 0;

        int[] result2 = MaxConsecutiveOnes.maxConsecutiveOnes(new int[]{1, 0, 1, 0, 1}, 2);
        assert result2[0] == 5;

        int[] result3 = MaxConsecutiveOnes.maxConsecutiveOnes(new int[]{1, 1, 1, 1}, 0);
        assert result3[0] == 4 && result3[1] == 0;

        int[] result4 = MaxConsecutiveOnes.maxConsecutiveOnes(new int[]{1, 1, 0, 1, 1}, 0);
        assert result4[0] == 2;

        int[] result5 = MaxConsecutiveOnes.maxConsecutiveOnes(new int[]{}, 2);
        assert result5[0] == 0;

        int[] result6 = MaxConsecutiveOnes.maxConsecutiveOnes(new int[]{1}, 0);
        assert result6[0] == 1 && result6[1] == 0;

        int[] result7 = MaxConsecutiveOnes.maxConsecutiveOnes(new int[]{0}, 1);
        assert result7[0] == 1;

        int[] result8 = MaxConsecutiveOnes.maxConsecutiveOnes(new int[]{0, 0, 0}, 2);
        assert result8[0] == 2;

        System.out.println("All tests passed!");
    }
}
