// BST Iterator — stack-based controlled in-order traversal (has_next/next interface)

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

struct BSTIterator<'a> {
    stack: Vec<&'a BSTNode>, // @step:initialize
}

impl<'a> BSTIterator<'a> {
    fn new(root: Option<&'a BSTNode>) -> Self {
        let mut iter = BSTIterator { stack: Vec::new() };
        iter.push_left(root); // @step:initialize
        iter
    }

    fn push_left(&mut self, mut node: Option<&'a BSTNode>) {
        while let Some(current) = node {
            self.stack.push(current); // @step:search-node
            node = current.left.as_deref();
        }
    }

    fn has_next(&self) -> bool {
        !self.stack.is_empty() // @step:search-node
    }

    fn next(&mut self) -> i32 {
        let node = self.stack.pop().unwrap(); // @step:found
        self.push_left(node.right.as_deref());
        node.value
    }
}

fn bst_iterator(root: Option<&BSTNode>) -> Vec<i32> {
    let mut iterator = BSTIterator::new(root); // @step:initialize
    let mut result = Vec::new();

    while iterator.has_next() {
        result.push(iterator.next()); // @step:found
    }

    result // @step:complete
}
