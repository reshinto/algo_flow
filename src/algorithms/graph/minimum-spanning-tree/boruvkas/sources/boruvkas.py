from typing import TypedDict


class WeightedEdge(TypedDict):
    source: str
    target: str
    weight: int


# Borůvka's Algorithm — each component finds its cheapest outgoing edge each round
def boruvkas_algorithm(edges: list[WeightedEdge], node_ids: list[str]) -> list[WeightedEdge]:
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

    def union(node_a: str, node_b: str) -> None:  # @step:initialize
        root_a = find(node_a)  # @step:initialize
        root_b = find(node_b)  # @step:initialize
        if root_a == root_b:  # @step:initialize
            return  # @step:initialize
        if rank[root_a] < rank[root_b]:  # @step:initialize
            parent[root_a] = root_b  # @step:initialize
        elif rank[root_a] > rank[root_b]:  # @step:initialize
            parent[root_b] = root_a  # @step:initialize
        else:  # @step:initialize
            parent[root_b] = root_a  # @step:initialize
            rank[root_a] += 1  # @step:initialize

    component_count = len(node_ids)  # @step:initialize

    while component_count > 1:
        cheapest_edge: dict[str, WeightedEdge | None] = {}  # @step:visit-edge

        for edge in edges:
            source_root = find(edge["source"])  # @step:visit-edge
            target_root = find(edge["target"])  # @step:visit-edge

            if source_root == target_root:  # @step:visit-edge
                continue

            existing_for_source = cheapest_edge.get(source_root)  # @step:visit-edge
            if existing_for_source is None or edge["weight"] < existing_for_source["weight"]:  # @step:visit-edge
                cheapest_edge[source_root] = edge  # @step:visit-edge

            existing_for_target = cheapest_edge.get(target_root)  # @step:visit-edge
            if existing_for_target is None or edge["weight"] < existing_for_target["weight"]:  # @step:visit-edge
                cheapest_edge[target_root] = edge  # @step:visit-edge

        for cheapest in cheapest_edge.values():
            if cheapest is None:
                continue
            source_root = find(cheapest["source"])  # @step:add-to-mst
            target_root = find(cheapest["target"])  # @step:add-to-mst
            if source_root == target_root:  # @step:add-to-mst
                continue
            union(cheapest["source"], cheapest["target"])  # @step:merge-components
            mst_edges.append(cheapest)  # @step:add-to-mst
            component_count -= 1  # @step:merge-components

    return mst_edges  # @step:complete
