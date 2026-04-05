// Online Stock Span — for each day's price, count consecutive days (including today) where price <= today's price
function onlineStockSpan(prices: number[]): number[] {
  const result: number[] = new Array(prices.length).fill(0); // @step:initialize
  // Stack holds [price, span] pairs in monotonic decreasing order by price
  const stack: [number, number][] = []; // @step:initialize

  for (let priceIdx = 0; priceIdx < prices.length; priceIdx++) {
    const currentPrice = prices[priceIdx]!; // @step:visit
    let spanCount = 1; // @step:visit

    // Pop all stack entries with price <= currentPrice, accumulating their spans
    while (stack.length > 0 && stack[stack.length - 1]![0] <= currentPrice) {
      // @step:compare
      spanCount += stack[stack.length - 1]![1]; // @step:maintain-monotonic
      stack.pop(); // @step:maintain-monotonic
    }

    stack.push([currentPrice, spanCount]); // @step:push
    result[priceIdx] = spanCount; // @step:resolve
  }

  return result; // @step:complete
}
