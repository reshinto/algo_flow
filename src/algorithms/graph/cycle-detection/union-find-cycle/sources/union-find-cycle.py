# Union-Find Cycle Detection — detect cycles by checking if two endpoints share a component
def union_find_cycle(
    edges: list[dict[str, str]],
    node_ids: list[str],
) -> bool:
    parent: dict[str, str] = {}  # @step:initialize
    rank: dict[str, int] = {}  # @step:initialize
    for node_id in node_ids:  # @step:initialize
        parent[node_id] = node_id  # @step:initialize
        rank[node_id] = 0  # @step:initialize

    def find_root(node_id: str) -> str:
        if parent[node_id] != node_id:
            parent[node_id] = find_root(parent[node_id])
        return parent[node_id]

    def union_components(node_a: str, node_b: str) -> None:
        root_a = find_root(node_a)
        root_b = find_root(node_b)
        if rank[root_a] < rank[root_b]:
            parent[root_a] = root_b
        elif rank[root_a] > rank[root_b]:
            parent[root_b] = root_a
        else:
            parent[root_b] = root_a
            rank[root_a] += 1

    for edge in edges:
        source_root = find_root(edge["source"])  # @step:visit-edge
        target_root = find_root(edge["target"])  # @step:visit-edge

        if source_root == target_root:  # @step:visit-edge
            return True  # @step:complete

        union_components(edge["source"], edge["target"])  # @step:merge-components

    return False  # @step:complete
