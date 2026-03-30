# Bellman-Ford — finds shortest paths tolerating negative edge weights; detects negative cycles
def bellman_ford(
    adjacency_list: dict[str, list[tuple[str, int]]],
    start_node_id: str,
    node_ids: list[str],
) -> dict[str, float]:
    distances: dict[str, float] = {}  # @step:initialize

    for node_id in node_ids:
        distances[node_id] = float("inf")  # @step:initialize
    distances[start_node_id] = 0  # @step:initialize

    vertex_count = len(node_ids)

    # Relax all edges (V - 1) times
    for _ in range(vertex_count - 1):
        for source_id in node_ids:
            neighbors = adjacency_list.get(source_id, [])
            for target_id, edge_weight in neighbors:
                source_dist = distances.get(source_id, float("inf"))
                if source_dist == float("inf"):  # @step:visit-edge
                    continue
                tentative_distance = source_dist + edge_weight  # @step:relax-edge
                if tentative_distance < distances.get(target_id, float("inf")):
                    distances[target_id] = tentative_distance  # @step:update-distance

    # Detect negative cycles — one more pass
    for source_id in node_ids:
        neighbors = adjacency_list.get(source_id, [])
        for target_id, edge_weight in neighbors:
            source_dist = distances.get(source_id, float("inf"))
            if source_dist == float("inf"):
                continue
            if source_dist + edge_weight < distances.get(target_id, float("inf")):
                distances[target_id] = float("-inf")  # @step:update-distance

    return distances  # @step:complete
