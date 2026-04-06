# Segment Tree — build from array then query range sums

def segment_tree_range_sum(array: list, queries: list) -> list:
    n = len(array)  # @step:initialize
    seg_tree = [0] * (4 * n)  # @step:initialize

    def build(node_idx, low, high):
        if low == high:
            seg_tree[node_idx] = array[low]  # @step:build-node
            return
        mid = (low + high) // 2
        build(2 * node_idx, low, mid)  # @step:traverse-left
        build(2 * node_idx + 1, mid + 1, high)  # @step:traverse-right
        seg_tree[node_idx] = seg_tree[2 * node_idx] + seg_tree[2 * node_idx + 1]  # @step:update-segment

    def query(node_idx, low, high, q_low, q_high):
        if q_low > high or q_high < low:
            return 0  # @step:query-range
        if q_low <= low and high <= q_high:
            return seg_tree[node_idx]  # @step:query-range
        mid = (low + high) // 2
        left_sum = query(2 * node_idx, low, mid, q_low, q_high)  # @step:traverse-left
        right_sum = query(2 * node_idx + 1, mid + 1, high, q_low, q_high)  # @step:traverse-right
        return left_sum + right_sum  # @step:query-range

    build(1, 0, n - 1)  # @step:build-node

    results = []
    for q_low, q_high in queries:
        results.append(query(1, 0, n - 1, q_low, q_high))  # @step:query-range
    return results  # @step:complete
