import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
avl_module = importlib.import_module("avl-insert-rotation")
avl_insert_rotation = avl_module.avl_insert_rotation


def test_inserts_single_value():
    assert avl_insert_rotation([5]) == [5]


def test_sorted_inorder_output_default_input():
    result = avl_insert_rotation([10, 20, 30, 25, 28, 27])
    assert result == sorted(result)


def test_rr_rotation_ascending():
    assert avl_insert_rotation([1, 2, 3]) == [1, 2, 3]


def test_ll_rotation_descending():
    assert avl_insert_rotation([3, 2, 1]) == [1, 2, 3]


def test_lr_rotation():
    assert avl_insert_rotation([3, 1, 2]) == [1, 2, 3]


def test_rl_rotation():
    assert avl_insert_rotation([1, 3, 2]) == [1, 2, 3]


def test_multiple_rotations_six_values():
    values = [10, 20, 30, 25, 28, 27]
    result = avl_insert_rotation(values)
    assert result == sorted(values)


def test_empty_input():
    assert avl_insert_rotation([]) == []


if __name__ == "__main__":
    test_inserts_single_value()
    test_sorted_inorder_output_default_input()
    test_rr_rotation_ascending()
    test_ll_rotation_descending()
    test_lr_rotation()
    test_rl_rotation()
    test_multiple_rotations_six_values()
    test_empty_input()
    print("All tests passed!")
