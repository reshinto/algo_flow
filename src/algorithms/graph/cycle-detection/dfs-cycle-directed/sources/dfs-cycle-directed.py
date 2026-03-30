# DFS Cycle Detection (Directed) — three-color marking via DFS
# White = unvisited, Gray = in current stack, Black = fully processed
def dfs_cycle_directed(
    adjacency_list: dict[str, list[str]],
    node_ids: list[str],
) -> bool:
    color_map: dict[str, str] = {}  # @step:initialize
    for node_id in node_ids:  # @step:initialize
        color_map[node_id] = "white"  # @step:initialize

    def dfs_visit(current_node_id: str) -> bool:
        color_map[current_node_id] = "gray"  # @step:push-stack

        neighbors = adjacency_list.get(current_node_id, [])  # @step:visit
        for neighbor_id in neighbors:
            if color_map.get(neighbor_id) == "gray":  # @step:classify-edge
                return True  # @step:classify-edge
            if color_map.get(neighbor_id) == "white":  # @step:classify-edge
                if dfs_visit(neighbor_id):  # @step:classify-edge
                    return True  # @step:classify-edge

        color_map[current_node_id] = "black"  # @step:process-node
        return False  # @step:process-node

    for node_id in node_ids:
        if color_map[node_id] == "white":  # @step:visit
            if dfs_visit(node_id):  # @step:visit
                return True  # @step:complete

    return False  # @step:complete
