import importlib

contains_duplicate = importlib.import_module("contains-duplicate").contains_duplicate


def test_returns_true_for_default_with_repeated_value():
    assert contains_duplicate([1, 2, 3, 1]) is True


def test_returns_false_when_all_unique():
    assert contains_duplicate([1, 2, 3, 4]) is False


def test_returns_false_for_single_element():
    assert contains_duplicate([42]) is False


def test_returns_false_for_empty_array():
    assert contains_duplicate([]) is False


def test_returns_true_when_first_two_elements_equal():
    assert contains_duplicate([5, 5, 6, 7]) is True


def test_returns_true_when_duplicate_at_end():
    assert contains_duplicate([1, 2, 3, 4, 5, 1]) is True


def test_returns_true_when_all_same():
    assert contains_duplicate([7, 7, 7, 7]) is True


def test_handles_negative_numbers():
    assert contains_duplicate([-1, -2, -3, -1]) is True


def test_returns_false_when_negatives_all_distinct():
    assert contains_duplicate([-3, -2, -1, 0]) is False


if __name__ == "__main__":
    test_returns_true_for_default_with_repeated_value()
    test_returns_false_when_all_unique()
    test_returns_false_for_single_element()
    test_returns_false_for_empty_array()
    test_returns_true_when_first_two_elements_equal()
    test_returns_true_when_duplicate_at_end()
    test_returns_true_when_all_same()
    test_handles_negative_numbers()
    test_returns_false_when_negatives_all_distinct()
    print("All tests passed!")
