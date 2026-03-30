from collections import deque


# Edmonds-Karp — max flow via BFS shortest augmenting paths (guaranteed O(VE^2))
def edmonds_karp(
    adjacency_list: dict[str, list[dict]], source_node_id: str, sink_node_id: str
) -> int:
    residual_capacity: dict[str, dict[str, int]] = {}  # @step:initialize
    for node_id, edges in adjacency_list.items():  # @step:initialize
        residual_capacity.setdefault(node_id, {})  # @step:initialize
        for edge in edges:  # @step:initialize
            target = edge["target"]  # @step:initialize
            capacity = edge["capacity"]  # @step:initialize
            prev = residual_capacity[node_id].get(target, 0)  # @step:initialize
            residual_capacity[node_id][target] = prev + capacity  # @step:initialize
            residual_capacity.setdefault(target, {})  # @step:initialize

    max_flow = 0  # @step:initialize

    def bfs_find_path() -> dict | None:
        parent_map: dict[str, str] = {}  # @step:enqueue
        visited_set: set[str] = {source_node_id}  # @step:enqueue
        node_queue: deque[str] = deque([source_node_id])  # @step:enqueue

        while len(node_queue) > 0:
            current_id = node_queue.popleft()  # @step:dequeue
            neighbors = list(residual_capacity.get(current_id, {}).keys())  # @step:visit-node
            for neighbor_id in neighbors:  # @step:visit-node
                residual = residual_capacity.get(current_id, {}).get(neighbor_id, 0)  # @step:visit-node
                if neighbor_id not in visited_set and residual > 0:
                    visited_set.add(neighbor_id)  # @step:enqueue
                    parent_map[neighbor_id] = current_id  # @step:enqueue
                    node_queue.append(neighbor_id)  # @step:enqueue
                    if neighbor_id == sink_node_id:  # @step:enqueue
                        return parent_map  # @step:enqueue
        return None  # @step:dequeue

    parent_map = bfs_find_path()  # @step:augment-flow
    while parent_map is not None:
        bottleneck = float("inf")  # @step:augment-flow
        current_id = sink_node_id  # @step:augment-flow
        while current_id != source_node_id:  # @step:augment-flow
            parent_id = parent_map[current_id]  # @step:augment-flow
            residual = residual_capacity.get(parent_id, {}).get(current_id, 0)  # @step:augment-flow
            bottleneck = min(bottleneck, residual)  # @step:augment-flow
            current_id = parent_id  # @step:augment-flow

        current_id = sink_node_id  # @step:augment-flow
        while current_id != source_node_id:  # @step:augment-flow
            parent_id = parent_map[current_id]  # @step:augment-flow
            fwd = residual_capacity.get(parent_id, {}).get(current_id, 0)  # @step:augment-flow
            residual_capacity[parent_id][current_id] = fwd - bottleneck  # @step:augment-flow
            residual_capacity.setdefault(current_id, {})  # @step:augment-flow
            back = residual_capacity[current_id].get(parent_id, 0)  # @step:augment-flow
            residual_capacity[current_id][parent_id] = back + bottleneck  # @step:augment-flow
            current_id = parent_id  # @step:augment-flow

        max_flow += bottleneck  # @step:augment-flow
        parent_map = bfs_find_path()  # @step:augment-flow

    return max_flow  # @step:complete
