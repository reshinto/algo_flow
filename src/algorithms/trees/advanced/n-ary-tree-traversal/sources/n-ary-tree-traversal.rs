// N-ary Tree Traversal — preorder visit using children vec

struct NAryNode {
    value: i32,
    children: Vec<NAryNode>,
}

fn preorder(node: &NAryNode, result: &mut Vec<i32>) {
    result.push(node.value); // @step:visit

    for child in &node.children {
        preorder(child, result); // @step:traverse-next
    }
}

fn n_ary_tree_traversal(root: Option<&NAryNode>) -> Vec<i32> {
    let mut result: Vec<i32> = Vec::new(); // @step:initialize

    if let Some(node) = root {
        preorder(node, &mut result); // @step:initialize
    }

    result // @step:complete
}
