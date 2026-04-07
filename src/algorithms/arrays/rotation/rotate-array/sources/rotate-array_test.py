import importlib

module = importlib.import_module("rotate-array")
rotate_array = module.rotate_array


def test_rotate_by_three():
    assert rotate_array([1, 2, 3, 4, 5, 6, 7], 3) == [5, 6, 7, 1, 2, 3, 4]


def test_rotate_by_zero():
    assert rotate_array([1, 2, 3, 4, 5], 0) == [1, 2, 3, 4, 5]


def test_rotate_by_length():
    assert rotate_array([1, 2, 3, 4, 5], 5) == [1, 2, 3, 4, 5]


def test_rotate_larger_than_length():
    result = rotate_array([1, 2, 3, 4, 5], 7)
    expected = rotate_array([1, 2, 3, 4, 5], 2)
    assert result == expected


def test_single_element():
    assert rotate_array([42], 1) == [42]


def test_empty_array():
    assert rotate_array([], 3) == []


def test_two_elements_by_one():
    assert rotate_array([1, 2], 1) == [2, 1]


def test_n_minus_one():
    assert rotate_array([1, 2, 3, 4, 5], 4) == [2, 3, 4, 5, 1]


def test_multiple_of_length():
    assert rotate_array([1, 2, 3], 6) == [1, 2, 3]


def test_does_not_mutate():
    original = [1, 2, 3, 4, 5]
    rotate_array(original, 2)
    assert original == [1, 2, 3, 4, 5]


def test_rotate_by_one_larger():
    assert rotate_array([1, 2, 3, 4, 5], 1) == [5, 1, 2, 3, 4]


if __name__ == "__main__":
    test_rotate_by_three()
    test_rotate_by_zero()
    test_rotate_by_length()
    test_rotate_larger_than_length()
    test_single_element()
    test_empty_array()
    test_two_elements_by_one()
    test_n_minus_one()
    test_multiple_of_length()
    test_does_not_mutate()
    test_rotate_by_one_larger()
    print("All tests passed!")
