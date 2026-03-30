# Greedy Graph Coloring — assign smallest available color to each node in order
def greedy_coloring(
    adjacency_list: dict[str, list[str]], node_ids: list[str]
) -> dict[str, int]:
    color_assignment: dict[str, int] = {}  # @step:initialize

    for node_id in node_ids:
        neighbor_colors: set[int] = set()  # @step:visit-node
        neighbors = adjacency_list.get(node_id, [])  # @step:visit-node
        for neighbor_id in neighbors:  # @step:visit-node
            if neighbor_id in color_assignment:  # @step:visit-node
                neighbor_colors.add(color_assignment[neighbor_id])  # @step:visit-node

        assigned_color = 0  # @step:assign-color
        while assigned_color in neighbor_colors:  # @step:assign-color
            assigned_color += 1  # @step:assign-color
        color_assignment[node_id] = assigned_color  # @step:assign-color

    return color_assignment  # @step:complete
