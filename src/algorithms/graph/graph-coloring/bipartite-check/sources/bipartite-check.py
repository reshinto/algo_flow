from collections import deque


# Bipartite Check — 2-coloring via BFS; conflict means not bipartite
def bipartite_check(
    adjacency_list: dict[str, list[str]], node_ids: list[str]
) -> dict:
    coloring: dict[str, int] = {}  # @step:initialize

    for start_node_id in node_ids:
        if start_node_id in coloring:  # @step:initialize
            continue  # @step:initialize

        coloring[start_node_id] = 0  # @step:enqueue
        node_queue: deque[str] = deque([start_node_id])  # @step:enqueue

        while len(node_queue) > 0:
            current_id = node_queue.popleft()  # @step:dequeue
            current_color = coloring[current_id]  # @step:visit-node
            neighbors = adjacency_list.get(current_id, [])  # @step:visit-node

            for neighbor_id in neighbors:  # @step:visit-node
                if neighbor_id not in coloring:
                    coloring[neighbor_id] = 1 - current_color  # @step:assign-color
                    node_queue.append(neighbor_id)  # @step:assign-color
                elif coloring[neighbor_id] == current_color:
                    return {"is_bipartite": False, "coloring": coloring}  # @step:check-conflict

    return {"is_bipartite": True, "coloring": coloring}  # @step:complete
