from collections import deque


# Kahn's Algorithm — topological sort using BFS and in-degree tracking
def kahns_topological_sort(
    adjacency_list: dict[str, list[str]], node_ids: list[str]
) -> list[str]:
    in_degree_map: dict[str, int] = {node_id: 0 for node_id in node_ids}  # @step:initialize
    for node_id in node_ids:  # @step:initialize
        for neighbor_id in adjacency_list.get(node_id, []):  # @step:initialize
            in_degree_map[neighbor_id] = in_degree_map.get(neighbor_id, 0) + 1  # @step:initialize

    node_queue: deque[str] = deque()  # @step:initialize
    for node_id in node_ids:
        if in_degree_map[node_id] == 0:  # @step:enqueue
            node_queue.append(node_id)  # @step:enqueue

    topological_order: list[str] = []

    while len(node_queue) > 0:
        current_node_id = node_queue.popleft()  # @step:dequeue
        topological_order.append(current_node_id)  # @step:add-to-order

        for neighbor_id in adjacency_list.get(current_node_id, []):
            in_degree_map[neighbor_id] -= 1  # @step:visit
            if in_degree_map[neighbor_id] == 0:  # @step:enqueue
                node_queue.append(neighbor_id)  # @step:enqueue

    return topological_order  # @step:complete
