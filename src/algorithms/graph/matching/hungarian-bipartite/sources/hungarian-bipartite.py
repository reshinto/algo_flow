# Hungarian Bipartite Matching (Kuhn's Algorithm) — maximum matching via augmenting paths
def hungarian_matching(
    adjacency_list: dict[str, list[str]],
    left_nodes: list[str],
    right_nodes: list[str],
) -> dict[str, str]:
    match_left: dict[str, str] = {}  # @step:initialize
    match_right: dict[str, str] = {}  # @step:initialize

    for left_node in left_nodes:  # @step:initialize
        visited_right: set[str] = set()  # @step:initialize
        try_augment(left_node, adjacency_list, match_left, match_right, visited_right)  # @step:visit

    return match_left  # @step:complete


def try_augment(
    left_node: str,
    adjacency_list: dict[str, list[str]],
    match_left: dict[str, str],
    match_right: dict[str, str],
    visited_right: set[str],
) -> bool:
    neighbors = adjacency_list.get(left_node, [])  # @step:visit-edge
    for right_node in neighbors:  # @step:visit-edge
        if right_node in visited_right:  # @step:visit-edge
            continue
        visited_right.add(right_node)  # @step:visit-edge

        current_owner = match_right.get(right_node)  # @step:visit-edge
        if current_owner is None or try_augment(
            current_owner, adjacency_list, match_left, match_right, visited_right
        ):
            match_left[left_node] = right_node  # @step:match-edge
            match_right[right_node] = left_node  # @step:match-edge
            return True  # @step:match-edge

    return False  # @step:visit-edge
