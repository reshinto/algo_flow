from __future__ import annotations
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class BstNode:
    value: int
    left: Optional[BstNode] = field(default=None)
    right: Optional[BstNode] = field(default=None)


def insert_node(root: Optional[BstNode], value: int) -> BstNode:  # @step:insert
    if root is None:
        return BstNode(value=value)  # @step:insert

    if value < root.value:  # @step:compare
        root.left = insert_node(root.left, value)  # @step:insert
    else:
        root.right = insert_node(root.right, value)  # @step:insert

    return root  # @step:insert


def inorder_traversal(root: Optional[BstNode], result: list[int]) -> None:  # @step:extract
    if root is None:
        return  # @step:extract

    inorder_traversal(root.left, result)  # @step:extract
    result.append(root.value)  # @step:mark-sorted
    inorder_traversal(root.right, result)  # @step:extract


def tree_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    array_length = len(input_array)  # @step:initialize

    if array_length == 0:
        return []  # @step:complete

    tree_root: Optional[BstNode] = None  # @step:initialize

    # Insert each element into the BST
    for insert_index in range(array_length):  # @step:insert
        tree_root = insert_node(tree_root, input_array[insert_index])  # @step:insert

    # Extract sorted order via inorder traversal
    sorted_array: list[int] = []  # @step:extract
    inorder_traversal(tree_root, sorted_array)  # @step:extract

    # @step:mark-sorted
    return sorted_array  # @step:complete
