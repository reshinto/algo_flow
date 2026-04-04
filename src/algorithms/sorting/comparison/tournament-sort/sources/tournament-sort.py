from math import inf

TOURNAMENT_INFINITY = inf


def build_tournament_tree(leaves: list[float]) -> list[float]:  # @step:build-tournament
    leaf_count = len(leaves)  # @step:build-tournament
    tree_size = 2 * leaf_count  # @step:build-tournament
    tree: list[float] = [TOURNAMENT_INFINITY] * tree_size  # @step:build-tournament

    # Place leaf values in second half of tree
    for leaf_index in range(leaf_count):  # @step:build-tournament
        tree[leaf_count + leaf_index] = leaves[leaf_index]  # @step:build-tournament

    # Build internal nodes (winners) bottom-up
    for node_index in range(leaf_count - 1, 0, -1):  # @step:compare
        left_child = 2 * node_index  # @step:compare
        right_child = 2 * node_index + 1  # @step:compare
        tree[node_index] = tree[left_child] if tree[left_child] <= tree[right_child] else tree[right_child]  # @step:compare

    return tree  # @step:build-tournament


def extract_winner_and_rebuild(tree: list[float], leaf_count: int) -> float:  # @step:extract-winner
    winner = tree[1]  # @step:extract-winner

    # Find the leaf that held the winner and replace with infinity
    node_index = 1  # @step:extract-winner
    while node_index < leaf_count:  # @step:compare
        left_child = 2 * node_index  # @step:compare
        right_child = 2 * node_index + 1  # @step:compare
        node_index = left_child if tree[left_child] == winner else right_child  # @step:compare

    tree[node_index] = TOURNAMENT_INFINITY  # @step:extract-winner

    # Rebuild internal nodes upward
    node_index = node_index // 2  # @step:build-tournament
    while node_index >= 1:  # @step:build-tournament
        left_child = 2 * node_index  # @step:build-tournament
        right_child = 2 * node_index + 1  # @step:build-tournament
        tree[node_index] = tree[left_child] if tree[left_child] <= tree[right_child] else tree[right_child]  # @step:compare
        node_index = node_index // 2  # @step:build-tournament

    return winner  # @step:extract-winner


def tournament_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    array_length = len(input_array)  # @step:initialize

    if array_length == 0:
        return []  # @step:complete

    leaves: list[float] = list(map(float, input_array))  # @step:initialize
    tree = build_tournament_tree(leaves)  # @step:build-tournament
    sorted_array: list[int] = []  # @step:extract-winner

    for _ in range(array_length):  # @step:extract-winner
        winner = extract_winner_and_rebuild(tree, len(leaves))  # @step:extract-winner
        sorted_array.append(int(winner))  # @step:mark-sorted

    # @step:mark-sorted
    return sorted_array  # @step:complete
