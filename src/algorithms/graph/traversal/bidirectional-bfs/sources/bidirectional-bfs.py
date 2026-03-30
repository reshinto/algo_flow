from collections import deque


# Bidirectional BFS — two simultaneous frontiers from start and target meeting in the middle
def bidirectional_bfs(
    adjacency_list: dict[str, list[str]],
    start_node_id: str,
    target_node_id: str,
) -> list[str] | None:
    if start_node_id == target_node_id:  # @step:initialize
        return [start_node_id]  # @step:initialize

    forward_visited: dict[str, str | None] = {start_node_id: None}  # @step:initialize
    backward_visited: dict[str, str | None] = {target_node_id: None}  # @step:initialize
    forward_queue: deque[str] = deque([start_node_id])  # @step:initialize
    backward_queue: deque[str] = deque([target_node_id])  # @step:initialize

    # Build undirected neighbor lookup by merging both edge directions
    undirected_neighbors: dict[str, list[str]] = {}
    for node_id, neighbors in adjacency_list.items():
        undirected_neighbors.setdefault(node_id, [])
        for neighbor_id in neighbors:
            undirected_neighbors[node_id].append(neighbor_id)
            undirected_neighbors.setdefault(neighbor_id, [])
            if node_id not in undirected_neighbors[neighbor_id]:
                undirected_neighbors[neighbor_id].append(node_id)

    while forward_queue or backward_queue:
        # Expand the forward frontier one level
        if forward_queue:
            current_node_id = forward_queue.popleft()  # @step:dequeue
            for neighbor_id in undirected_neighbors.get(current_node_id, []):  # @step:visit-edge
                if neighbor_id not in forward_visited:
                    forward_visited[neighbor_id] = current_node_id  # @step:visit-edge
                    forward_queue.append(neighbor_id)  # @step:visit-edge,enqueue
                    if neighbor_id in backward_visited:  # @step:complete
                        return reconstruct_path(forward_visited, backward_visited, neighbor_id)  # @step:complete

        # Expand the backward frontier one level
        if backward_queue:
            current_node_id = backward_queue.popleft()  # @step:dequeue
            for neighbor_id in undirected_neighbors.get(current_node_id, []):  # @step:visit-edge
                if neighbor_id not in backward_visited:
                    backward_visited[neighbor_id] = current_node_id  # @step:visit-edge
                    backward_queue.append(neighbor_id)  # @step:visit-edge,enqueue
                    if neighbor_id in forward_visited:  # @step:complete
                        return reconstruct_path(forward_visited, backward_visited, neighbor_id)  # @step:complete

    return None  # @step:complete


def reconstruct_path(
    forward_visited: dict[str, str | None],
    backward_visited: dict[str, str | None],
    meeting_node_id: str,
) -> list[str]:
    forward_path: list[str] = []
    current_node: str | None = meeting_node_id
    while current_node is not None:
        forward_path.insert(0, current_node)
        current_node = forward_visited.get(current_node)

    backward_path: list[str] = []
    back_node: str | None = backward_visited.get(meeting_node_id)
    while back_node is not None:
        backward_path.append(back_node)
        back_node = backward_visited.get(back_node)

    return forward_path + backward_path
