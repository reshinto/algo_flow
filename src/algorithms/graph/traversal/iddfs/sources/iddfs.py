from typing import Optional


# IDDFS — iterative deepening depth-first search using increasing depth limits
def iterative_deepening_dfs(
    adjacency_list: dict[str, list[str]],
    start_node_id: str,
    max_depth: Optional[int] = None,
) -> list[str]:
    visit_order: list[str] = []  # @step:initialize
    resolved_max_depth = max_depth if max_depth is not None else len(adjacency_list)  # @step:initialize

    for depth_limit in range(resolved_max_depth + 1):  # @step:initialize
        visit_order = []  # @step:initialize
        visited_set: set[str] = set()  # @step:initialize

        node_stack: list[tuple[str, int]] = [(start_node_id, 0)]  # @step:push-stack

        while len(node_stack) > 0:
            current_node_id, current_depth = node_stack.pop()  # @step:pop-stack

            if current_node_id in visited_set:  # @step:backtrack
                continue  # @step:backtrack

            visited_set.add(current_node_id)  # @step:visit
            visit_order.append(current_node_id)  # @step:visit

            if current_depth >= depth_limit:  # @step:visit
                continue  # @step:visit

            neighbors = adjacency_list.get(current_node_id, [])  # @step:visit-edge
            for neighbor_id in reversed(neighbors):  # @step:visit-edge
                if neighbor_id not in visited_set:  # @step:visit-edge
                    node_stack.append((neighbor_id, current_depth + 1))  # @step:push-stack

        all_visited = all(node_id in visited_set for node_id in adjacency_list)  # @step:complete
        if all_visited:  # @step:complete
            break  # @step:complete

    return visit_order  # @step:complete
