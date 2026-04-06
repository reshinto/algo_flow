# Build Binary Tree from Postorder + Inorder (Iterative with Stack)
# Processes postorder right-to-left; uses inorder (right-to-left) to detect
# when to switch from right-child insertion to left-child insertion.

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def build_from_postorder_inorder_iterative(postorder: list, inorder: list):
    if not postorder:  # @step:initialize
        return None

    root = TreeNode(postorder[-1])  # @step:build-node
    stack = [root]  # @step:initialize
    inorder_pointer = len(inorder) - 1  # @step:initialize

    for postorder_pointer in range(len(postorder) - 2, -1, -1):  # @step:select-element
        current_value = postorder[postorder_pointer]  # @step:select-element
        parent_node = stack[-1]  # @step:search-node
        new_node = TreeNode(current_value)  # @step:build-node

        # If top of stack doesn't match inorder, attach as right child
        if parent_node.value != inorder[inorder_pointer]:
            parent_node.right = new_node  # @step:connect-child
        else:
            # Pop matching nodes to find the left-child parent
            while stack and stack[-1].value == inorder[inorder_pointer]:  # @step:partition-array
                parent_node = stack.pop()  # @step:partition-array
                inorder_pointer -= 1  # @step:partition-array
            parent_node.left = new_node  # @step:connect-child

        stack.append(new_node)  # @step:visit

    return root  # @step:visit
