from typing import TypedDict


class WeightedEdge(TypedDict):
    source: str
    target: str
    weight: int


# Kruskal's Algorithm — build MST by sorting edges and merging components with Union-Find
def kruskals_algorithm(edges: list[WeightedEdge], node_ids: list[str]) -> list[WeightedEdge]:
    mst_edges: list[WeightedEdge] = []  # @step:initialize
    parent: dict[str, str] = {}  # @step:initialize
    rank: dict[str, int] = {}  # @step:initialize

    for node_id in node_ids:  # @step:initialize
        parent[node_id] = node_id  # @step:initialize
        rank[node_id] = 0  # @step:initialize

    def find(node_id: str) -> str:  # @step:initialize
        if parent[node_id] != node_id:  # @step:initialize
            parent[node_id] = find(parent[node_id])  # @step:initialize
        return parent[node_id]  # @step:initialize

    def union(node_a: str, node_b: str) -> bool:  # @step:initialize
        root_a = find(node_a)  # @step:initialize
        root_b = find(node_b)  # @step:initialize
        if root_a == root_b:  # @step:initialize
            return False  # @step:initialize
        if rank[root_a] < rank[root_b]:  # @step:initialize
            parent[root_a] = root_b  # @step:initialize
        elif rank[root_a] > rank[root_b]:  # @step:initialize
            parent[root_b] = root_a  # @step:initialize
        else:  # @step:initialize
            parent[root_b] = root_a  # @step:initialize
            rank[root_a] += 1  # @step:initialize
        return True  # @step:initialize

    sorted_edges = sorted(edges, key=lambda edge: edge["weight"])  # @step:sort-edges

    for edge in sorted_edges:
        source_root = find(edge["source"])  # @step:visit-edge
        target_root = find(edge["target"])  # @step:visit-edge

        if source_root != target_root:  # @step:visit-edge
            union(edge["source"], edge["target"])  # @step:add-to-mst
            mst_edges.append(edge)  # @step:add-to-mst
        else:
            # Edge would create a cycle — reject it
            pass  # @step:reject-edge

        if len(mst_edges) == len(node_ids) - 1:  # @step:add-to-mst
            break

    return mst_edges  # @step:complete
