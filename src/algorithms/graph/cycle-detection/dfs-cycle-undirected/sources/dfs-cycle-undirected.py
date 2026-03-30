# DFS Cycle Detection (Undirected) — parent tracking to identify back edges
def dfs_cycle_undirected(
    adjacency_list: dict[str, list[str]],
    node_ids: list[str],
) -> bool:
    visited_set: set[str] = set()  # @step:initialize

    def dfs_visit(current_node_id: str, parent_node_id: str | None) -> bool:
        visited_set.add(current_node_id)  # @step:push-stack

        neighbors = adjacency_list.get(current_node_id, [])  # @step:visit
        for neighbor_id in neighbors:
            if neighbor_id not in visited_set:  # @step:classify-edge
                if dfs_visit(neighbor_id, current_node_id):  # @step:classify-edge
                    return True  # @step:classify-edge
            elif neighbor_id != parent_node_id:  # @step:classify-edge
                return True  # @step:classify-edge

        return False  # @step:pop-stack

    for node_id in node_ids:
        if node_id not in visited_set:  # @step:visit
            if dfs_visit(node_id, None):  # @step:visit
                return True  # @step:complete

    return False  # @step:complete
