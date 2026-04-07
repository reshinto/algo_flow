import importlib

set_union_module = importlib.import_module("set-union")
set_union = set_union_module.set_union


def test_combines_unique_elements():
    result = set_union([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])
    assert result == [1, 2, 3, 4, 5, 6, 7]


def test_disjoint_returns_all_elements():
    result = set_union([1, 3, 5], [2, 4, 6])
    assert result == [1, 3, 5, 2, 4, 6]


def test_b_subset_of_a_returns_a_elements():
    result = set_union([1, 2, 3, 4, 5], [2, 4])
    assert result == [1, 2, 3, 4, 5]


def test_identical_arrays():
    result = set_union([1, 2, 3], [1, 2, 3])
    assert result == [1, 2, 3]


def test_empty_a():
    result = set_union([], [1, 2, 3])
    assert result == [1, 2, 3]


def test_empty_b():
    result = set_union([1, 2, 3], [])
    assert result == [1, 2, 3]


def test_both_empty():
    result = set_union([], [])
    assert result == []


def test_single_element_match():
    result = set_union([7], [7])
    assert result == [7]


def test_single_element_no_match():
    result = set_union([7], [8])
    assert result == [7, 8]


def test_no_duplicates_from_repeated_values_in_b():
    result = set_union([1, 2, 3], [2, 2, 2])
    assert result == [1, 2, 3]


if __name__ == "__main__":
    test_combines_unique_elements()
    test_disjoint_returns_all_elements()
    test_b_subset_of_a_returns_a_elements()
    test_identical_arrays()
    test_empty_a()
    test_empty_b()
    test_both_empty()
    test_single_element_match()
    test_single_element_no_match()
    test_no_duplicates_from_repeated_values_in_b()
    print("All tests passed!")
