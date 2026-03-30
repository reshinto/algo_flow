import heapq


# Dijkstra's algorithm — finds shortest paths from a source using a min-priority queue
def dijkstra_shortest_path(
    adjacency_list: dict[str, list[tuple[str, int]]],
    start_node_id: str,
) -> dict[str, float]:
    distances: dict[str, float] = {}  # @step:initialize
    visited: set[str] = set()  # @step:initialize

    # Initialize all distances to infinity
    for node_id in adjacency_list:
        distances[node_id] = float("inf")  # @step:initialize
    distances[start_node_id] = 0  # @step:initialize

    # Min-heap: (distance, node_id)
    priority_queue: list[tuple[float, str]] = [(0, start_node_id)]  # @step:initialize

    while priority_queue:
        current_dist, current_node_id = heapq.heappop(priority_queue)  # @step:dequeue

        if current_node_id in visited:  # @step:dequeue
            continue
        visited.add(current_node_id)  # @step:visit

        for neighbor_id, edge_weight in adjacency_list.get(current_node_id, []):
            tentative_distance = current_dist + edge_weight  # @step:relax-edge
            if tentative_distance < distances.get(neighbor_id, float("inf")):
                distances[neighbor_id] = tentative_distance  # @step:update-distance
                heapq.heappush(priority_queue, (tentative_distance, neighbor_id))  # @step:update-distance

    return distances  # @step:complete
