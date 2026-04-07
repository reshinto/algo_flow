public class KadanesAlgorithm_test {
    public static void main(String[] args) {
        // result[0]=maxSum, result[1]=startIndex, result[2]=endIndex
        int[] result1 = KadanesAlgorithm.kadanesAlgorithm(new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4});
        assert result1[0] == 6 && result1[1] == 3 && result1[2] == 6;

        int[] result2 = KadanesAlgorithm.kadanesAlgorithm(new int[]{1, 2, 3, 4, 5});
        assert result2[0] == 15 && result2[1] == 0 && result2[2] == 4;

        int[] result3 = KadanesAlgorithm.kadanesAlgorithm(new int[]{-5, -3, -8, -1, -4});
        assert result3[0] == -1 && result3[1] == 3 && result3[2] == 3;

        int[] result4 = KadanesAlgorithm.kadanesAlgorithm(new int[]{42});
        assert result4[0] == 42 && result4[1] == 0 && result4[2] == 0;

        int[] result5 = KadanesAlgorithm.kadanesAlgorithm(new int[]{});
        assert result5[0] == 0 && result5[1] == -1 && result5[2] == -1;

        int[] result6 = KadanesAlgorithm.kadanesAlgorithm(new int[]{3, 3, 3, 3});
        assert result6[0] == 12 && result6[1] == 0 && result6[2] == 3;

        int[] result7 = KadanesAlgorithm.kadanesAlgorithm(new int[]{10, 9, -100, 1, 2});
        assert result7[0] == 19 && result7[1] == 0 && result7[2] == 1;

        int[] result8 = KadanesAlgorithm.kadanesAlgorithm(new int[]{1, -100, 8, 9, 10});
        assert result8[0] == 27 && result8[1] == 2 && result8[2] == 4;

        System.out.println("All tests passed!");
    }
}
