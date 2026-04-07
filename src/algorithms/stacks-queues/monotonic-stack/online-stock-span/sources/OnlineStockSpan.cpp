// Online Stock Span — for each day's price, count consecutive days (including today) where price <= today's price
#include <iostream>
#include <stack>
#include <vector>

std::vector<int> onlineStockSpan(const std::vector<int>& prices) {
    std::vector<int> result(prices.size(), 0); // @step:initialize
    // Stack holds {price, span} pairs in monotonic decreasing order by price
    std::stack<std::pair<int, int>> stack; // @step:initialize

    for (std::size_t priceIdx = 0; priceIdx < prices.size(); priceIdx++) {
        int currentPrice = prices[priceIdx]; // @step:visit
        int spanCount = 1; // @step:visit

        // Pop all stack entries with price <= currentPrice, accumulating their spans
        while (!stack.empty() && stack.top().first <= currentPrice) { // @step:compare
            spanCount += stack.top().second; // @step:maintain-monotonic
            stack.pop(); // @step:maintain-monotonic
        }

        stack.push({currentPrice, spanCount}); // @step:push
        result[priceIdx] = spanCount; // @step:resolve
    }

    return result; // @step:complete
}

int main() {
    std::vector<int> prices = {100, 80, 60, 70, 60, 75, 85};
    auto result = onlineStockSpan(prices);
    for (int val : result) std::cout << val << " ";
    std::cout << std::endl;
    return 0;
}
