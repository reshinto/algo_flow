# Build Binary Tree from Preorder + Inorder (Iterative with Stack)
# Uses a stack to simulate recursion — push nodes as we consume preorder values,
# pop when we detect a boundary via the inorder pointer.

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def build_from_preorder_inorder_iterative(preorder: list, inorder: list):
    if not preorder:  # @step:initialize
        return None

    root = TreeNode(preorder[0])  # @step:build-node
    stack = [root]  # @step:initialize
    inorder_pointer = 0  # @step:initialize

    for preorder_pointer in range(1, len(preorder)):  # @step:select-element
        current_value = preorder[preorder_pointer]  # @step:select-element
        parent_node = stack[-1]  # @step:search-node
        new_node = TreeNode(current_value)  # @step:build-node

        # If top of stack doesn't match inorder, attach as left child
        if parent_node.value != inorder[inorder_pointer]:
            parent_node.left = new_node  # @step:connect-child
        else:
            # Pop matching nodes to find the right-child parent
            while stack and stack[-1].value == inorder[inorder_pointer]:  # @step:partition-array
                parent_node = stack.pop()  # @step:partition-array
                inorder_pointer += 1  # @step:partition-array
            parent_node.right = new_node  # @step:connect-child

        stack.append(new_node)  # @step:visit

    return root  # @step:visit
