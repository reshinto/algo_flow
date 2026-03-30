# DFS — traverse depth-first using a LIFO stack
def depth_first_search(adjacency_list: dict[str, list[str]], start_node_id: str) -> list[str]:
    visit_order: list[str] = []  # @step:initialize
    visited_set: set[str] = set()  # @step:initialize
    node_stack: list[str] = [start_node_id]  # @step:initialize,push-stack

    while len(node_stack) > 0:
        current_node_id = node_stack.pop()  # @step:pop-stack
        if current_node_id in visited_set:  # @step:pop-stack
            continue

        visited_set.add(current_node_id)  # @step:visit
        visit_order.append(current_node_id)  # @step:visit

        # Push neighbors onto stack (reverse order preserves left-to-right traversal)
        neighbors = adjacency_list.get(current_node_id, [])
        for neighbor_id in neighbors:
            if neighbor_id not in visited_set:  # @step:visit-edge
                node_stack.append(neighbor_id)  # @step:visit-edge,push-stack

    return visit_order  # @step:complete
