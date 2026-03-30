from collections import deque


# DFS Topological Sort — post-order DFS, prepend finished nodes to result
def dfs_topological_sort(
    adjacency_list: dict[str, list[str]], node_ids: list[str]
) -> list[str]:
    visited_set: set[str] = set()  # @step:initialize
    topological_order: deque[str] = deque()  # @step:initialize

    def dfs_visit(current_node_id: str) -> None:
        visited_set.add(current_node_id)  # @step:visit
        for neighbor_id in adjacency_list.get(current_node_id, []):  # @step:visit
            if neighbor_id not in visited_set:  # @step:push-stack
                dfs_visit(neighbor_id)  # @step:push-stack
        topological_order.appendleft(current_node_id)  # @step:add-to-order

    for node_id in node_ids:
        if node_id not in visited_set:  # @step:push-stack
            dfs_visit(node_id)  # @step:push-stack

    return list(topological_order)  # @step:complete
