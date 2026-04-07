public class BestTimeBuySell_test {
    public static void main(String[] args) {
        // result[0]=maxProfit, result[1]=buyDay, result[2]=sellDay
        int[] result1 = BestTimeBuySell.bestTimeBuySell(new int[]{7, 1, 5, 3, 6, 4});
        assert result1[0] == 5 : "Expected profit=5";
        assert result1[1] == 1 : "Expected buyDay=1";
        assert result1[2] == 4 : "Expected sellDay=4";

        int[] result2 = BestTimeBuySell.bestTimeBuySell(new int[]{7, 6, 4, 3, 1});
        assert result2[0] == 0 : "Expected profit=0";

        int[] result3 = BestTimeBuySell.bestTimeBuySell(new int[]{1, 2, 3, 4, 5});
        assert result3[0] == 4 && result3[1] == 0 && result3[2] == 4;

        int[] result4 = BestTimeBuySell.bestTimeBuySell(new int[]{42});
        assert result4[0] == 0;

        int[] result5 = BestTimeBuySell.bestTimeBuySell(new int[]{});
        assert result5[0] == 0 && result5[1] == -1 && result5[2] == -1;

        int[] result6 = BestTimeBuySell.bestTimeBuySell(new int[]{1, 100, 2, 3});
        assert result6[0] == 99 && result6[1] == 0 && result6[2] == 1;

        int[] result7 = BestTimeBuySell.bestTimeBuySell(new int[]{9, 8, 7, 1, 10});
        assert result7[0] == 9 && result7[1] == 3 && result7[2] == 4;

        int[] result8 = BestTimeBuySell.bestTimeBuySell(new int[]{5, 3, 1, 2, 8});
        assert result8[0] == 7 && result8[1] == 2 && result8[2] == 4;

        System.out.println("All tests passed!");
    }
}
