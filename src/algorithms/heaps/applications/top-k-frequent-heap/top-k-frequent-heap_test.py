import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

top_k_frequent_heap = importlib.import_module("top-k-frequent-heap").top_k_frequent_heap


def test_returns_k_elements():
    result = top_k_frequent_heap([1, 1, 1, 2, 2, 3, 3, 3, 3, 4], 2)
    assert len(result) == 2


def test_includes_most_frequent():
    result = top_k_frequent_heap([1, 1, 1, 2, 2, 3, 3, 3, 3, 4], 2)
    assert 1 in result
    assert 3 in result


def test_k_equals_unique_count():
    result = top_k_frequent_heap([5, 5, 6, 6, 7, 7], 3)
    assert len(result) == 3


def test_top1():
    result = top_k_frequent_heap([4, 4, 4, 4, 2, 2, 1], 1)
    assert result == [4]


def test_all_same():
    result = top_k_frequent_heap([9, 9, 9, 9], 1)
    assert result == [9]


def test_single_element():
    result = top_k_frequent_heap([3], 1)
    assert result == [3]


def test_excludes_low_frequency():
    result = top_k_frequent_heap([1, 1, 1, 2, 2, 3, 3, 3, 3, 4], 2)
    assert 4 not in result


def test_k3_from_default():
    result = top_k_frequent_heap([1, 1, 1, 2, 2, 3, 3, 3, 3, 4], 3)
    assert len(result) == 3
    assert 1 in result
    assert 2 in result
    assert 3 in result


if __name__ == "__main__":
    test_returns_k_elements()
    test_includes_most_frequent()
    test_k_equals_unique_count()
    test_top1()
    test_all_same()
    test_single_element()
    test_excludes_low_frequency()
    test_k3_from_default()
    print("All tests passed!")
