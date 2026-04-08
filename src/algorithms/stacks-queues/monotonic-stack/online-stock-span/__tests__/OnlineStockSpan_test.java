// javac OnlineStockSpan.java OnlineStockSpan_test.java && java -ea OnlineStockSpan_test
import java.util.Arrays;

public class OnlineStockSpan_test {
    public static void main(String[] args) {
        assert Arrays.equals(OnlineStockSpan.onlineStockSpan(new int[]{100, 80, 60, 70, 60, 75, 85}), new int[]{1, 1, 1, 2, 1, 4, 6});
        assert Arrays.equals(OnlineStockSpan.onlineStockSpan(new int[]{50}), new int[]{1});
        assert Arrays.equals(OnlineStockSpan.onlineStockSpan(new int[]{100, 90, 80, 70}), new int[]{1, 1, 1, 1});
        assert Arrays.equals(OnlineStockSpan.onlineStockSpan(new int[]{10, 20, 30, 40}), new int[]{1, 2, 3, 4});
        assert Arrays.equals(OnlineStockSpan.onlineStockSpan(new int[]{50, 50, 50, 50}), new int[]{1, 2, 3, 4});
        assert Arrays.equals(OnlineStockSpan.onlineStockSpan(new int[]{3, 1, 2}), new int[]{1, 1, 2});
        assert Arrays.equals(OnlineStockSpan.onlineStockSpan(new int[]{5, 10}), new int[]{1, 2});
        assert Arrays.equals(OnlineStockSpan.onlineStockSpan(new int[]{10, 5}), new int[]{1, 1});
        assert Arrays.equals(OnlineStockSpan.onlineStockSpan(new int[]{7, 7}), new int[]{1, 2});
        assert Arrays.equals(OnlineStockSpan.onlineStockSpan(new int[]{1, 3, 1, 3, 1}), new int[]{1, 2, 1, 4, 1});

        System.out.println("All tests passed!");
    }
}
