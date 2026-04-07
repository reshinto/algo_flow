import importlib

subset_check_module = importlib.import_module("subset-check")
subset_check = subset_check_module.subset_check


def test_a_is_proper_subset_of_b():
    result = subset_check([2, 4], [1, 2, 3, 4, 5])
    assert result["is_subset"] is True


def test_element_of_a_missing_from_b():
    result = subset_check([2, 9], [1, 2, 3, 4, 5])
    assert result["is_subset"] is False


def test_identical_arrays():
    result = subset_check([1, 2, 3], [1, 2, 3])
    assert result["is_subset"] is True


def test_empty_a_is_subset_of_any():
    result = subset_check([], [1, 2, 3])
    assert result["is_subset"] is True


def test_empty_b_non_empty_a():
    result = subset_check([1], [])
    assert result["is_subset"] is False


def test_both_empty():
    result = subset_check([], [])
    assert result["is_subset"] is True


def test_a_has_elements_not_in_b():
    result = subset_check([1, 2, 3, 4, 5], [2, 4])
    assert result["is_subset"] is False


def test_a_equals_b_different_order():
    result = subset_check([3, 1, 2], [1, 2, 3])
    assert result["is_subset"] is True


def test_single_element_a_present_in_b():
    result = subset_check([7], [5, 6, 7, 8])
    assert result["is_subset"] is True


def test_single_element_a_absent_from_b():
    result = subset_check([9], [5, 6, 7, 8])
    assert result["is_subset"] is False


if __name__ == "__main__":
    test_a_is_proper_subset_of_b()
    test_element_of_a_missing_from_b()
    test_identical_arrays()
    test_empty_a_is_subset_of_any()
    test_empty_b_non_empty_a()
    test_both_empty()
    test_a_has_elements_not_in_b()
    test_a_equals_b_different_order()
    test_single_element_a_present_in_b()
    test_single_element_a_absent_from_b()
    print("All tests passed!")
