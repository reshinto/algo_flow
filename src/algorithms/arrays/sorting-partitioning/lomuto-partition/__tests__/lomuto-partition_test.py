import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("lomuto-partition")
lomuto_partition = module.lomuto_partition


def test_default_input_pivot_at_correct_position():
    result = lomuto_partition([8, 3, 6, 1, 5, 9, 2, 7])
    assert result["result"][result["pivot_index"]] == 7
    for left_idx in range(result["pivot_index"]):
        assert result["result"][left_idx] <= 7
    for right_idx in range(result["pivot_index"] + 1, len(result["result"])):
        assert result["result"][right_idx] > 7


def test_sorted_array_pivot_at_last():
    result = lomuto_partition([1, 2, 3, 4, 5])
    assert result["pivot_index"] == 4
    assert result["result"][4] == 5


def test_reverse_sorted_pivot_at_first():
    result = lomuto_partition([5, 4, 3, 2, 1])
    assert result["pivot_index"] == 0
    assert result["result"][0] == 1


def test_all_same_elements():
    result = lomuto_partition([3, 3, 3])
    assert result["result"][result["pivot_index"]] == 3


def test_single_element():
    result = lomuto_partition([42])
    assert result["pivot_index"] == 0
    assert result["result"] == [42]


def test_empty_array():
    result = lomuto_partition([])
    assert result["pivot_index"] == -1
    assert result["result"] == []


def test_two_elements_larger_first():
    result = lomuto_partition([5, 2])
    assert result["pivot_index"] == 0
    assert result["result"][0] == 2
    assert result["result"][1] == 5


def test_does_not_mutate_original():
    original = [8, 3, 6, 1, 5, 9, 2, 7]
    lomuto_partition(original)
    assert original == [8, 3, 6, 1, 5, 9, 2, 7]


if __name__ == "__main__":
    test_default_input_pivot_at_correct_position()
    test_sorted_array_pivot_at_last()
    test_reverse_sorted_pivot_at_first()
    test_all_same_elements()
    test_single_element()
    test_empty_array()
    test_two_elements_larger_first()
    test_does_not_mutate_original()
    print("All tests passed!")
