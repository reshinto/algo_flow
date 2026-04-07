import importlib

set_symmetric_difference_module = importlib.import_module("set-symmetric-difference")
set_symmetric_difference = set_symmetric_difference_module.set_symmetric_difference


def test_elements_exclusive_to_each_array():
    result = sorted(set_symmetric_difference([1, 2, 3, 4], [3, 4, 5, 6]))
    assert result == [1, 2, 5, 6]


def test_disjoint_arrays_return_all_elements():
    result = sorted(set_symmetric_difference([1, 3, 5], [2, 4, 6]))
    assert result == [1, 2, 3, 4, 5, 6]


def test_identical_arrays_return_empty():
    result = set_symmetric_difference([1, 2, 3], [1, 2, 3])
    assert result == []


def test_empty_b_returns_all_of_a():
    result = sorted(set_symmetric_difference([1, 2, 3], []))
    assert result == [1, 2, 3]


def test_empty_a_returns_all_of_b():
    result = sorted(set_symmetric_difference([], [1, 2, 3]))
    assert result == [1, 2, 3]


def test_single_element_match():
    result = set_symmetric_difference([7], [7])
    assert result == []


def test_single_element_no_match():
    result = sorted(set_symmetric_difference([7], [8]))
    assert result == [7, 8]


def test_a_subset_of_b():
    result = sorted(set_symmetric_difference([2, 4], [1, 2, 3, 4, 5]))
    assert result == [1, 3, 5]


def test_b_subset_of_a():
    result = sorted(set_symmetric_difference([1, 2, 3, 4, 5], [2, 4]))
    assert result == [1, 3, 5]


if __name__ == "__main__":
    test_elements_exclusive_to_each_array()
    test_disjoint_arrays_return_all_elements()
    test_identical_arrays_return_empty()
    test_empty_b_returns_all_of_a()
    test_empty_a_returns_all_of_b()
    test_single_element_match()
    test_single_element_no_match()
    test_a_subset_of_b()
    test_b_subset_of_a()
    print("All tests passed!")
