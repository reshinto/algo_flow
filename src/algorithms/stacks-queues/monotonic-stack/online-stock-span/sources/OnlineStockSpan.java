// Online Stock Span — for each day's price, count consecutive days (including today) where price <= today's price
import java.util.ArrayDeque;
import java.util.Deque;

public class OnlineStockSpan {
    public static int[] onlineStockSpan(int[] prices) {
        int[] result = new int[prices.length]; // @step:initialize
        // Stack holds int[]{price, span} pairs in monotonic decreasing order by price
        Deque<int[]> stack = new ArrayDeque<>(); // @step:initialize

        for (int priceIdx = 0; priceIdx < prices.length; priceIdx++) {
            int currentPrice = prices[priceIdx]; // @step:visit
            int spanCount = 1; // @step:visit

            // Pop all stack entries with price <= currentPrice, accumulating their spans
            while (!stack.isEmpty() && stack.peek()[0] <= currentPrice) { // @step:compare
                spanCount += stack.peek()[1]; // @step:maintain-monotonic
                stack.pop(); // @step:maintain-monotonic
            }

            stack.push(new int[]{currentPrice, spanCount}); // @step:push
            result[priceIdx] = spanCount; // @step:resolve
        }

        return result; // @step:complete
    }
}
