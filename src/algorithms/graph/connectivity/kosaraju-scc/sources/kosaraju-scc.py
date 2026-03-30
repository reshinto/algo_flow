# Kosaraju's SCC — two-pass DFS: first pass collects finish order, second pass on transposed graph
def kosaraju_scc(adjacency_list: dict[str, list[str]], node_ids: list[str]) -> list[list[str]]:
    visited_set: set[str] = set()  # @step:initialize
    finish_order: list[str] = []  # @step:initialize

    # First pass: DFS on original graph to collect finish order
    def dfs_first_pass(node_id: str) -> None:
        visited_set.add(node_id)  # @step:visit
        neighbors = adjacency_list.get(node_id, [])
        for neighbor_id in neighbors:
            if neighbor_id not in visited_set:
                dfs_first_pass(neighbor_id)  # @step:visit-edge
        finish_order.append(node_id)  # @step:push-stack

    for node_id in node_ids:
        if node_id not in visited_set:
            dfs_first_pass(node_id)  # @step:initialize

    # Build transposed adjacency list
    transposed_list: dict[str, list[str]] = {node_id: [] for node_id in node_ids}  # @step:initialize
    for source_id in node_ids:
        for target_id in adjacency_list.get(source_id, []):
            transposed_list.setdefault(target_id, []).append(source_id)  # @step:initialize

    # Second pass: DFS on transposed graph in reverse finish order
    visited_set.clear()  # @step:initialize
    components: list[list[str]] = []  # @step:initialize

    def dfs_second_pass(node_id: str, current_component: list[str]) -> None:
        visited_set.add(node_id)  # @step:visit
        current_component.append(node_id)  # @step:visit
        neighbors = transposed_list.get(node_id, [])
        for neighbor_id in neighbors:
            if neighbor_id not in visited_set:
                dfs_second_pass(neighbor_id, current_component)  # @step:visit-edge

    for node_id in reversed(finish_order):
        if node_id not in visited_set:
            current_component: list[str] = []  # @step:pop-stack
            dfs_second_pass(node_id, current_component)  # @step:pop-stack
            components.append(current_component)  # @step:assign-component

    return components  # @step:complete
