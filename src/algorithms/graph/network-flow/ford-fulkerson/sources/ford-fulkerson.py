from math import inf


# Ford-Fulkerson — max flow via DFS augmenting paths in a residual graph
def ford_fulkerson(
    adjacency_list: dict[str, list[dict]], source_node_id: str, sink_node_id: str
) -> int:
    if source_node_id == sink_node_id:  # @step:initialize
        return 0  # @step:initialize

    residual_capacity: dict[str, dict[str, int]] = {}  # @step:initialize
    for node_id in adjacency_list:  # @step:initialize
        residual_capacity[node_id] = {}  # @step:initialize
    for node_id, edges in adjacency_list.items():  # @step:initialize
        for edge in edges:  # @step:initialize
            target = edge["target"]  # @step:initialize
            capacity = edge["capacity"]  # @step:initialize
            residual_capacity.setdefault(target, {})  # @step:initialize
            prev = residual_capacity[node_id].get(target, 0)  # @step:initialize
            residual_capacity[node_id][target] = prev + capacity  # @step:initialize

    max_flow = 0  # @step:initialize

    def dfs_augment(current_id: str, visited_set: set, bottleneck: int) -> int:
        if current_id == sink_node_id:  # @step:dfs-augment
            return bottleneck  # @step:dfs-augment
        visited_set.add(current_id)  # @step:dfs-augment
        neighbors = list(residual_capacity.get(current_id, {}).keys())  # @step:visit-edge
        for neighbor_id in neighbors:  # @step:visit-edge
            residual = residual_capacity.get(current_id, {}).get(neighbor_id, 0)  # @step:visit-edge
            if neighbor_id not in visited_set and residual > 0:
                flow = dfs_augment(neighbor_id, visited_set, min(bottleneck, residual))  # @step:augment-flow
                if flow > 0:  # @step:augment-flow
                    residual_capacity[current_id][neighbor_id] = residual - flow  # @step:augment-flow
                    residual_capacity.setdefault(neighbor_id, {})  # @step:augment-flow
                    back = residual_capacity[neighbor_id].get(current_id, 0)  # @step:augment-flow
                    residual_capacity[neighbor_id][current_id] = back + flow  # @step:augment-flow
                    return flow  # @step:augment-flow
        return 0  # @step:dfs-augment

    while True:  # @step:augment-flow
        visited_set: set = set()  # @step:augment-flow
        path_flow = dfs_augment(source_node_id, visited_set, inf)  # @step:augment-flow
        if path_flow == 0:  # @step:augment-flow
            break  # @step:augment-flow
        max_flow += path_flow  # @step:augment-flow

    return max_flow  # @step:complete
