# Expression Tree Evaluation — build expression tree from postfix, then evaluate

class ExprNode:
    def __init__(self, token, left=None, right=None):
        self.token = token
        self.left = left
        self.right = right

OPERATORS = {'+', '-', '*', '/'}

def expression_tree_evaluation(expression: str) -> int:
    tokens = expression.strip().split()  # @step:initialize
    stack = []  # @step:initialize

    for token in tokens:
        if token in OPERATORS:
            right_operand = stack.pop()  # @step:connect-child
            left_operand = stack.pop()  # @step:connect-child
            stack.append(ExprNode(token, left_operand, right_operand))  # @step:build-node
        else:
            stack.append(ExprNode(token))  # @step:build-node

    root = stack[0] if stack else None

    def evaluate(node):
        if not node:
            return 0
        if not node.left and not node.right:
            return int(node.token)  # @step:visit
        left_val = evaluate(node.left)  # @step:traverse-left
        right_val = evaluate(node.right)  # @step:traverse-right
        if node.token == "+":
            return left_val + right_val  # @step:visit
        elif node.token == "-":
            return left_val - right_val  # @step:visit
        elif node.token == "*":
            return left_val * right_val  # @step:visit
        elif node.token == "/":
            return int(left_val / right_val)  # @step:visit
        return 0

    return evaluate(root)  # @step:complete
