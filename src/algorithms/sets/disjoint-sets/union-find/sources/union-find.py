# Union-Find (Disjoint Set Union) — Path Compression + Union by Rank
# Maintains a partition of elements into disjoint sets.
# find(x): returns the root representative of x's set, compressing the path.
# union(x, y): merges the sets containing x and y using rank heuristic.
# Time: O(α(n)) amortized per operation — Space: O(n)


def union_find(element_count: int, operations: list[list[int]]) -> dict:
    parent = list(range(element_count))  # @step:initialize
    rank = [0] * element_count  # @step:initialize

    def find(element: int) -> int:  # @step:find-root
        if parent[element] != element:
            parent[element] = find(parent[element])  # @step:find-root
        return parent[element]

    def union(elem_a: int, elem_b: int) -> None:
        root_a = find(elem_a)  # @step:find-root
        root_b = find(elem_b)  # @step:find-root
        if root_a == root_b:
            return

        if rank[root_a] >= rank[root_b]:
            parent[root_b] = root_a  # @step:union-sets
            if rank[root_a] == rank[root_b]:
                rank[root_a] += 1
        else:
            parent[root_a] = root_b  # @step:union-sets

    for elem_a, elem_b in operations:
        union(elem_a, elem_b)

    # Build final components
    component_map: dict[int, list[int]] = {}
    for elem_idx in range(element_count):
        root = find(elem_idx)
        if root not in component_map:
            component_map[root] = []
        component_map[root].append(elem_idx)

    return {"components": list(component_map.values())}  # @step:complete
