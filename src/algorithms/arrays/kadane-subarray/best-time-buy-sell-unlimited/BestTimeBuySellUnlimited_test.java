public class BestTimeBuySellUnlimited_test {
    public static void main(String[] args) {
        // Default input [7,1,5,3,6,4] -> profit=7
        assert BestTimeBuySellUnlimited.bestTimeBuySellUnlimited(new int[]{7, 1, 5, 3, 6, 4}) == 7;

        // Empty -> profit=0
        assert BestTimeBuySellUnlimited.bestTimeBuySellUnlimited(new int[]{}) == 0;

        // Single price -> profit=0
        assert BestTimeBuySellUnlimited.bestTimeBuySellUnlimited(new int[]{5}) == 0;

        // Always falling -> profit=0
        assert BestTimeBuySellUnlimited.bestTimeBuySellUnlimited(new int[]{5, 4, 3, 2, 1}) == 0;

        // Strictly increasing [1,2,3,4,5] -> profit=4
        assert BestTimeBuySellUnlimited.bestTimeBuySellUnlimited(new int[]{1, 2, 3, 4, 5}) == 4;

        // Alternating [1,5,1,5,1,5] -> profit=12
        assert BestTimeBuySellUnlimited.bestTimeBuySellUnlimited(new int[]{1, 5, 1, 5, 1, 5}) == 12;

        // All equal -> profit=0
        assert BestTimeBuySellUnlimited.bestTimeBuySellUnlimited(new int[]{3, 3, 3, 3}) == 0;

        // Two prices with gain [1,7] -> profit=6
        assert BestTimeBuySellUnlimited.bestTimeBuySellUnlimited(new int[]{1, 7}) == 6;

        // [1,5,3,7] -> profit=8
        assert BestTimeBuySellUnlimited.bestTimeBuySellUnlimited(new int[]{1, 5, 3, 7}) == 8;

        System.out.println("All tests passed!");
    }
}
