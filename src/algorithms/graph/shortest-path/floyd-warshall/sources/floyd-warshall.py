# Floyd-Warshall — computes all-pairs shortest paths via dynamic programming
def floyd_warshall(
    adjacency_list: dict[str, list[tuple[str, int]]],
    node_ids: list[str],
) -> dict[str, dict[str, float]]:
    # Initialize distance matrix
    distances: dict[str, dict[str, float]] = {}  # @step:initialize

    for source_id in node_ids:
        distances[source_id] = {}
        for target_id in node_ids:
            if source_id == target_id:
                distances[source_id][target_id] = 0  # @step:initialize
            else:
                distances[source_id][target_id] = float("inf")  # @step:initialize

    # Set direct edge weights
    for source_id in node_ids:
        for target_id, edge_weight in adjacency_list.get(source_id, []):
            distances[source_id][target_id] = edge_weight  # @step:initialize

    # Triple nested loop: try every intermediate node
    for intermediate_id in node_ids:
        for source_id in node_ids:
            for target_id in node_ids:
                through_intermediate = (
                    distances[source_id].get(intermediate_id, float("inf"))
                    + distances[intermediate_id].get(target_id, float("inf"))
                )  # @step:relax-edge
                if through_intermediate < distances[source_id].get(target_id, float("inf")):
                    distances[source_id][target_id] = through_intermediate  # @step:update-distance

    return distances  # @step:complete
