import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

top_k_frequent_elements = importlib.import_module("top-k-frequent-elements").top_k_frequent_elements


def test_returns_top_2_from_default():
    result = top_k_frequent_elements([1, 1, 1, 2, 2, 3], 2)
    assert len(result) == 2
    assert 1 in result
    assert 2 in result


def test_returns_single_top_element_when_k_equals_1():
    result = top_k_frequent_elements([1, 1, 2, 2, 2, 3], 1)
    assert len(result) == 1
    assert result[0] == 2


def test_returns_all_elements_when_k_equals_unique_count():
    result = top_k_frequent_elements([1, 2, 3], 3)
    assert len(result) == 3
    assert 1 in result
    assert 2 in result
    assert 3 in result


def test_handles_all_same_elements():
    result = top_k_frequent_elements([7, 7, 7, 7], 1)
    assert result == [7]


def test_returns_correct_top_k_with_clear_winner():
    result = top_k_frequent_elements([4, 4, 4, 4, 5, 5, 6], 2)
    assert len(result) == 2
    assert 4 in result
    assert 5 in result


def test_handles_negative_numbers():
    result = top_k_frequent_elements([-1, -1, -2, -2, -2, 3], 2)
    assert len(result) == 2
    assert -2 in result
    assert -1 in result


def test_handles_two_element_input_with_k_equals_1():
    result = top_k_frequent_elements([10, 10], 1)
    assert result == [10]


def test_returns_exactly_k_elements():
    result = top_k_frequent_elements([1, 2, 3, 4, 5], 2)
    assert len(result) == 2


if __name__ == "__main__":
    test_returns_top_2_from_default()
    test_returns_single_top_element_when_k_equals_1()
    test_returns_all_elements_when_k_equals_unique_count()
    test_handles_all_same_elements()
    test_returns_correct_top_k_with_clear_winner()
    test_handles_negative_numbers()
    test_handles_two_element_input_with_k_equals_1()
    test_returns_exactly_k_elements()
    print("All tests passed!")
