import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

build_max_heap = importlib.import_module("build-max-heap").build_max_heap


def is_max_heap(array):
    size = len(array)
    for parent_idx in range(size // 2):
        left_idx = 2 * parent_idx + 1
        right_idx = 2 * parent_idx + 2
        if left_idx < size and array[parent_idx] < array[left_idx]:
            return False
        if right_idx < size and array[parent_idx] < array[right_idx]:
            return False
    return True


def test_valid_max_heap():
    result = build_max_heap([9, 5, 7, 1, 3, 8, 2, 6, 4])
    assert is_max_heap(result)


def test_root_is_maximum():
    result = build_max_heap([9, 5, 7, 1, 3, 8, 2, 6, 4])
    assert result[0] == 9


def test_preserves_all_elements():
    input_arr = [9, 5, 7, 1, 3, 8, 2, 6, 4]
    result = build_max_heap(input_arr)
    assert sorted(result) == sorted(input_arr)


def test_already_valid_max_heap():
    result = build_max_heap([9, 7, 8, 5, 6, 3, 4])
    assert is_max_heap(result)
    assert result[0] == 9


def test_sorted_ascending():
    result = build_max_heap([1, 2, 3, 4, 5, 6, 7])
    assert is_max_heap(result)
    assert result[0] == 7


def test_single_element():
    result = build_max_heap([42])
    assert result == [42]


def test_two_elements():
    result = build_max_heap([2, 5])
    assert result[0] == 5
    assert is_max_heap(result)


if __name__ == "__main__":
    test_valid_max_heap()
    test_root_is_maximum()
    test_preserves_all_elements()
    test_already_valid_max_heap()
    test_sorted_ascending()
    test_single_element()
    test_two_elements()
    print("All tests passed!")
