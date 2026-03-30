from collections import defaultdict

# DAG Shortest Path — finds shortest paths from a source in a directed acyclic graph
# using topological sort followed by edge relaxation in topological order
def dag_shortest_path(
    adjacency_list: dict[str, list[tuple[str, int]]],
    start_node_id: str,
    node_ids: list[str],
) -> dict[str, float]:
    distances: dict[str, float] = {}  # @step:initialize
    for node_id in node_ids:
        distances[node_id] = float("inf")  # @step:initialize
    distances[start_node_id] = 0  # @step:initialize

    # Topological sort via DFS
    visited: set[str] = set()  # @step:initialize
    topological_order: list[str] = []  # @step:initialize

    def dfs_visit(node_id: str) -> None:
        visited.add(node_id)
        for neighbor_id, _ in adjacency_list.get(node_id, []):
            if neighbor_id not in visited:
                dfs_visit(neighbor_id)
        topological_order.insert(0, node_id)  # @step:add-to-order

    for node_id in node_ids:
        if node_id not in visited:
            dfs_visit(node_id)

    # Relax edges in topological order
    for node_id in topological_order:
        if distances.get(node_id, float("inf")) == float("inf"):
            continue  # @step:process-node
        for neighbor_id, edge_weight in adjacency_list.get(node_id, []):
            tentative_distance = distances.get(node_id, float("inf")) + edge_weight  # @step:relax-edge
            if tentative_distance < distances.get(neighbor_id, float("inf")):
                distances[neighbor_id] = tentative_distance  # @step:update-distance

    return distances  # @step:complete
