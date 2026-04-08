import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

pq_change_priority = importlib.import_module("pq-change-priority").pq_change_priority


def is_min_heap(array):
    size = len(array)
    for parent_idx in range(size // 2):
        left_idx = 2 * parent_idx + 1
        right_idx = 2 * parent_idx + 2
        if left_idx < size and array[parent_idx] > array[left_idx]:
            return False
        if right_idx < size and array[parent_idx] > array[right_idx]:
            return False
    return True


def test_decrease_produces_valid_heap():
    result = pq_change_priority([2, 5, 3, 10, 15, 8, 7], 4, 1)
    assert is_min_heap(result)


def test_decrease_to_global_min_becomes_root():
    result = pq_change_priority([2, 5, 3, 10, 15, 8, 7], 4, 1)
    assert result[0] == 1


def test_increase_produces_valid_heap():
    result = pq_change_priority([2, 5, 3, 10, 15, 8, 7], 0, 20)
    assert is_min_heap(result)


def test_increase_root_changes_root():
    result = pq_change_priority([2, 5, 3, 10, 15, 8, 7], 0, 20)
    assert result[0] == 3


def test_leaf_decrease_bubbles_up():
    result = pq_change_priority([1, 3, 5, 7, 9, 8, 6], 6, 0)
    assert is_min_heap(result)
    assert result[0] == 0


def test_increase_leaf():
    result = pq_change_priority([1, 3, 5, 7, 9], 4, 100)
    assert is_min_heap(result)


def test_no_op_same_value():
    result = pq_change_priority([2, 5, 3, 10, 15, 8, 7], 2, 3)
    assert is_min_heap(result)


if __name__ == "__main__":
    test_decrease_produces_valid_heap()
    test_decrease_to_global_min_becomes_root()
    test_increase_produces_valid_heap()
    test_increase_root_changes_root()
    test_leaf_decrease_bubbles_up()
    test_increase_leaf()
    test_no_op_same_value()
    print("All tests passed!")
