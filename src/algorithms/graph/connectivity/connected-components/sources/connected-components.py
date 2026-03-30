from collections import deque


# Connected Components — find all connected components in an undirected graph using BFS
def connected_components(
    adjacency_list: dict[str, list[str]],
    node_ids: list[str],
) -> list[list[str]]:
    components: list[list[str]] = []  # @step:initialize
    visited_set: set[str] = set()  # @step:initialize

    for start_node_id in node_ids:
        if start_node_id in visited_set:  # @step:initialize
            continue

        current_component: list[str] = []  # @step:enqueue
        node_queue: deque[str] = deque([start_node_id])  # @step:enqueue
        visited_set.add(start_node_id)  # @step:enqueue

        while len(node_queue) > 0:
            current_node_id = node_queue.popleft()  # @step:dequeue
            current_component.append(current_node_id)  # @step:dequeue,visit

            neighbors = adjacency_list.get(current_node_id, [])
            for neighbor_id in neighbors:
                if neighbor_id not in visited_set:
                    visited_set.add(neighbor_id)  # @step:visit-edge
                    node_queue.append(neighbor_id)  # @step:visit-edge,enqueue

        components.append(current_component)  # @step:assign-component

    return components  # @step:complete
