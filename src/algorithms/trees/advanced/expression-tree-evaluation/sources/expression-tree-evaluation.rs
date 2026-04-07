// Expression Tree Evaluation — build expression tree from postfix, then evaluate

struct ExprNode {
    token: String,
    left: Option<Box<ExprNode>>,
    right: Option<Box<ExprNode>>,
}

impl ExprNode {
    fn new(token: &str) -> Self {
        ExprNode { token: token.to_string(), left: None, right: None }
    }
}

fn evaluate(node: &Option<Box<ExprNode>>) -> i64 {
    let node = match node {
        None => return 0,
        Some(n) => n,
    };

    if node.left.is_none() && node.right.is_none() {
        return node.token.parse().unwrap_or(0); // @step:visit
    }

    let left_value = evaluate(&node.left);  // @step:traverse-left
    let right_value = evaluate(&node.right); // @step:traverse-right

    match node.token.as_str() {
        "+" => left_value + right_value, // @step:visit
        "-" => left_value - right_value, // @step:visit
        "*" => left_value * right_value, // @step:visit
        "/" => left_value / right_value, // @step:visit
        _ => 0,
    }
}

fn expression_tree_evaluation(expression: &str) -> i64 {
    let tokens: Vec<&str> = expression.trim().split_whitespace().collect(); // @step:initialize
    let mut stack: Vec<Box<ExprNode>> = Vec::new(); // @step:initialize

    for token in &tokens {
        if token.parse::<i64>().is_ok() {
            stack.push(Box::new(ExprNode::new(token))); // @step:build-node
        } else {
            let right_operand = stack.pop().unwrap(); // @step:connect-child
            let left_operand = stack.pop().unwrap();  // @step:connect-child
            let mut node = Box::new(ExprNode::new(token));
            node.left = Some(left_operand);
            node.right = Some(right_operand);
            stack.push(node); // @step:build-node
        }
    }

    let root = stack.into_iter().next().map(|n| n);
    evaluate(&root) // @step:complete
}
