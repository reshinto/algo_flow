// Tournament Sort — build a tournament tree of comparisons, extract winner, replace and rebuild
const TOURNAMENT_INFINITY: i64 = i64::MAX;

fn build_tournament_tree(leaves: &[i64]) -> Vec<i64> {
    // @step:build-tournament
    let leaf_count = leaves.len(); // @step:build-tournament
    let tree_size = 2 * leaf_count; // @step:build-tournament
    let mut tree: Vec<i64> = vec![TOURNAMENT_INFINITY; tree_size]; // @step:build-tournament

    // Place leaf values in second half of tree
    for leaf_index in 0..leaf_count {
        // @step:build-tournament
        tree[leaf_count + leaf_index] = leaves[leaf_index]; // @step:build-tournament
    }

    // Build internal nodes (winners) bottom-up
    for node_index in (1..leaf_count).rev() {
        // @step:compare
        let left_child = 2 * node_index; // @step:compare
        let right_child = 2 * node_index + 1; // @step:compare
        tree[node_index] = if tree[left_child] <= tree[right_child] { tree[left_child] } else { tree[right_child] }; // @step:compare
    }

    tree // @step:build-tournament
}

fn extract_winner_and_rebuild(tree: &mut Vec<i64>, leaf_count: usize) -> i64 {
    // @step:extract-winner
    let winner = tree[1]; // @step:extract-winner

    // Find the leaf position that held the winner and replace with infinity
    let mut node_index = 1usize; // @step:extract-winner
    while node_index < leaf_count {
        // @step:compare
        let left_child = 2 * node_index; // @step:compare
        let right_child = 2 * node_index + 1; // @step:compare
        node_index = if tree[left_child] == winner { left_child } else { right_child }; // @step:compare
    }

    tree[node_index] = TOURNAMENT_INFINITY; // @step:extract-winner

    // Rebuild internal nodes from the modified leaf upward
    node_index /= 2; // @step:build-tournament
    while node_index >= 1 {
        // @step:build-tournament
        let left_child = 2 * node_index; // @step:build-tournament
        let right_child = 2 * node_index + 1; // @step:build-tournament
        tree[node_index] = if tree[left_child] <= tree[right_child] { tree[left_child] } else { tree[right_child] }; // @step:compare
        node_index /= 2; // @step:build-tournament
    }

    winner // @step:extract-winner
}

fn tournament_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let array_length = input_array.len(); // @step:initialize

    if array_length == 0 {
        return vec![]; // @step:complete
    }

    let leaves = input_array.to_vec(); // @step:initialize
    let mut tree = build_tournament_tree(&leaves); // @step:build-tournament
    let mut sorted_array: Vec<i64> = Vec::new(); // @step:extract-winner

    for _extract_index in 0..array_length {
        // @step:extract-winner
        let winner = extract_winner_and_rebuild(&mut tree, leaves.len()); // @step:extract-winner
        sorted_array.push(winner); // @step:mark-sorted
    }

    // @step:mark-sorted
    sorted_array // @step:complete
}
