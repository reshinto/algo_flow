// Distribute Coins — DFS: each node sends or receives excess coins from children

struct BinaryNode {
    value: i32, // number of coins at this node
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn dfs(node: &Option<Box<BinaryNode>>, total_moves: &mut i32) -> i32 {
    match node {
        None => 0, // @step:initialize
        Some(current) => {
            // Get excess from left and right children
            let left_excess = dfs(&current.left, total_moves);   // @step:traverse-left
            let right_excess = dfs(&current.right, total_moves); // @step:traverse-right

            // Each move on the edge to a child counts
            *total_moves += left_excess.abs() + right_excess.abs(); // @step:accumulate

            // Excess this node sends upward: (coins here) + (excess from children) - 1 (keep 1)
            current.value + left_excess + right_excess - 1 // @step:visit
        }
    }
}

fn distribute_coins(root: &Option<Box<BinaryNode>>) -> i32 {
    let mut total_moves = 0; // @step:initialize
    dfs(root, &mut total_moves); // @step:initialize
    total_moves // @step:complete
}
