# Build Binary Tree from Postorder + Inorder Traversal (Recursive)
# Last element of postorder is root; find root in inorder to split left/right subtrees

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def build_from_postorder_inorder(postorder: list, inorder: list):
    if not postorder or not inorder:  # @step:initialize
        return None

    root_value = postorder[-1]  # @step:select-element
    root = TreeNode(root_value)  # @step:build-node

    inorder_root_index = inorder.index(root_value)  # @step:partition-array

    # Split inorder into left and right subtree sequences
    left_inorder = inorder[:inorder_root_index]  # @step:partition-array
    right_inorder = inorder[inorder_root_index + 1:]  # @step:partition-array

    left_postorder = postorder[:len(left_inorder)]  # @step:partition-array
    right_postorder = postorder[len(left_inorder):-1]  # @step:partition-array

    root.left = build_from_postorder_inorder(left_postorder, left_inorder)  # @step:connect-child
    root.right = build_from_postorder_inorder(right_postorder, right_inorder)  # @step:connect-child

    return root  # @step:visit
