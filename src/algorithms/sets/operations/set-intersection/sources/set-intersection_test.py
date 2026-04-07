import importlib

set_intersection_module = importlib.import_module("set-intersection")
set_intersection = set_intersection_module.set_intersection


def test_common_elements_default():
    result = set_intersection([1, 2, 3, 4, 5, 8], [2, 4, 6, 8, 10])
    assert result == [2, 4, 8]


def test_disjoint_returns_empty():
    result = set_intersection([1, 3, 5], [2, 4, 6])
    assert result == []


def test_identical_arrays():
    result = set_intersection([1, 2, 3], [1, 2, 3])
    assert sorted(result) == [1, 2, 3]


def test_a_subset_of_b():
    result = set_intersection([2, 4], [1, 2, 3, 4, 5])
    assert sorted(result) == [2, 4]


def test_b_subset_of_a():
    result = set_intersection([1, 2, 3, 4, 5], [2, 4])
    assert sorted(result) == [2, 4]


def test_no_duplicates_when_b_has_repeated_values():
    result = set_intersection([1, 2, 3], [2, 2, 2])
    assert result == [2]


def test_empty_a():
    result = set_intersection([], [1, 2, 3])
    assert result == []


def test_empty_b():
    result = set_intersection([1, 2, 3], [])
    assert result == []


def test_single_element_match():
    result = set_intersection([7], [7])
    assert result == [7]


def test_single_element_no_match():
    result = set_intersection([7], [8])
    assert result == []


if __name__ == "__main__":
    test_common_elements_default()
    test_disjoint_returns_empty()
    test_identical_arrays()
    test_a_subset_of_b()
    test_b_subset_of_a()
    test_no_duplicates_when_b_has_repeated_values()
    test_empty_a()
    test_empty_b()
    test_single_element_match()
    test_single_element_no_match()
    print("All tests passed!")
