# Build Binary Tree from Preorder + Inorder Traversal (Recursive)
# First element of preorder is root; find root in inorder to split left/right subtrees

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def build_from_preorder_inorder(preorder: list, inorder: list):
    if not preorder or not inorder:  # @step:initialize
        return None

    root_value = preorder[0]  # @step:select-element
    root = TreeNode(root_value)  # @step:build-node

    inorder_root_index = inorder.index(root_value)  # @step:partition-array

    # Split inorder and preorder into left/right sub-arrays
    left_inorder = inorder[:inorder_root_index]  # @step:partition-array
    left_preorder = preorder[1:1 + len(left_inorder)]  # @step:partition-array

    right_inorder = inorder[inorder_root_index + 1:]  # @step:partition-array
    right_preorder = preorder[1 + len(left_inorder):]  # @step:partition-array

    root.left = build_from_preorder_inorder(left_preorder, left_inorder)  # @step:connect-child
    root.right = build_from_preorder_inorder(right_preorder, right_inorder)  # @step:connect-child

    return root  # @step:visit
