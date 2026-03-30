import heapq


# A* search — finds shortest path using f = g + h (cost-so-far + heuristic estimate)
def a_star_search(
    adjacency_list: dict[str, list[tuple[str, int]]],
    start_node_id: str,
    target_node_id: str,
    heuristic: dict[str, float],
) -> list[str] | None:
    g_costs: dict[str, float] = {}  # @step:initialize
    predecessors: dict[str, str | None] = {}  # @step:initialize
    visited: set[str] = set()  # @step:initialize

    for node_id in adjacency_list:
        g_costs[node_id] = float("inf")  # @step:initialize
        predecessors[node_id] = None  # @step:initialize
    g_costs[start_node_id] = 0  # @step:initialize

    # Open set as min-heap: (f_cost, node_id)
    open_queue: list[tuple[float, str]] = [(heuristic.get(start_node_id, 0), start_node_id)]  # @step:initialize

    while open_queue:
        _, current_node_id = heapq.heappop(open_queue)  # @step:dequeue

        if current_node_id in visited:  # @step:dequeue
            continue
        visited.add(current_node_id)  # @step:visit

        if current_node_id == target_node_id:
            # Reconstruct path
            path: list[str] = []
            trace_id: str | None = current_node_id
            while trace_id is not None:
                path.insert(0, trace_id)
                trace_id = predecessors.get(trace_id)
            return path  # @step:complete

        for neighbor_id, edge_weight in adjacency_list.get(current_node_id, []):
            if neighbor_id in visited:
                continue
            tentative_g_cost = g_costs.get(current_node_id, float("inf")) + edge_weight  # @step:relax-edge
            if tentative_g_cost < g_costs.get(neighbor_id, float("inf")):
                g_costs[neighbor_id] = tentative_g_cost  # @step:update-distance
                predecessors[neighbor_id] = current_node_id  # @step:update-distance
                f_cost = tentative_g_cost + heuristic.get(neighbor_id, 0)
                heapq.heappush(open_queue, (f_cost, neighbor_id))  # @step:update-distance

    return None  # @step:complete
