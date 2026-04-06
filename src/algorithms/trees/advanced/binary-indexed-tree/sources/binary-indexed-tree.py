# Binary Indexed Tree (Fenwick Tree) — prefix sum queries and point updates

def binary_indexed_tree(array: list, queries: list) -> list:
    n = len(array)  # @step:initialize
    bit = [0] * (n + 1)  # @step:initialize

    def update(bit_idx, delta):
        while bit_idx <= n:
            bit[bit_idx] += delta  # @step:update-segment
            bit_idx += bit_idx & (-bit_idx)

    def prefix_sum(bit_idx):
        total = 0
        while bit_idx > 0:
            total += bit[bit_idx]  # @step:compute-prefix
            bit_idx -= bit_idx & (-bit_idx)
        return total  # @step:compute-prefix

    for pos in range(n):
        update(pos + 1, array[pos])  # @step:update-segment

    results = []
    for q_low, q_high in queries:
        range_sum = prefix_sum(q_high + 1) - prefix_sum(q_low)  # @step:query-range
        results.append(range_sum)
    return results  # @step:complete
