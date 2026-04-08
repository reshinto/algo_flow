import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

build_heap_top_down = importlib.import_module("build-heap-top-down").build_heap_top_down


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


def test_valid_min_heap():
    result = build_heap_top_down([9, 5, 7, 1, 3, 8, 2, 6, 4])
    assert is_min_heap(result), f"Result is not a valid min-heap: {result}"


def test_root_is_minimum():
    result = build_heap_top_down([9, 5, 7, 1, 3, 8, 2, 6, 4])
    assert result[0] == 1


def test_preserves_all_elements():
    input_arr = [9, 5, 7, 1, 3, 8, 2, 6, 4]
    result = build_heap_top_down(input_arr)
    assert sorted(result) == sorted(input_arr)


def test_already_sorted():
    result = build_heap_top_down([1, 2, 3, 4, 5, 6, 7])
    assert is_min_heap(result)
    assert result[0] == 1


def test_reverse_sorted():
    result = build_heap_top_down([7, 6, 5, 4, 3, 2, 1])
    assert is_min_heap(result)
    assert result[0] == 1


def test_single_element():
    result = build_heap_top_down([42])
    assert result == [42]


def test_two_elements():
    result = build_heap_top_down([5, 2])
    assert result[0] == 2
    assert is_min_heap(result)


if __name__ == "__main__":
    test_valid_min_heap()
    test_root_is_minimum()
    test_preserves_all_elements()
    test_already_sorted()
    test_reverse_sorted()
    test_single_element()
    test_two_elements()
    print("All tests passed!")
