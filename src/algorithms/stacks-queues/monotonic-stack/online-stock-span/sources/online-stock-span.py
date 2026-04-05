# Online Stock Span — for each day's price, count consecutive days (including today) where price <= today's price
def online_stock_span(prices):
    result = [0] * len(prices)  # @step:initialize
    # Stack holds (price, span) tuples in monotonic decreasing order by price
    stack = []  # @step:initialize

    for price_idx, current_price in enumerate(prices):  # @step:visit
        span_count = 1  # @step:visit

        # Pop all stack entries with price <= current_price, accumulating their spans
        while stack and stack[-1][0] <= current_price:  # @step:compare
            span_count += stack[-1][1]  # @step:maintain-monotonic
            stack.pop()  # @step:maintain-monotonic

        stack.append((current_price, span_count))  # @step:push
        result[price_idx] = span_count  # @step:resolve

    return result  # @step:complete
