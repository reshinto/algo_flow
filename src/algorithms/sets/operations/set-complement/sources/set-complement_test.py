import importlib

set_complement_module = importlib.import_module("set-complement")
set_complement = set_complement_module.set_complement


def test_elements_in_universal_set_not_in_a():
    result = set_complement([2, 4, 6], [1, 2, 3, 4, 5, 6, 7, 8])
    assert result == [1, 3, 5, 7, 8]


def test_empty_a_returns_full_universal_set():
    result = set_complement([], [1, 2, 3])
    assert result == [1, 2, 3]


def test_a_equals_universal_set_returns_empty():
    result = set_complement([1, 2, 3], [1, 2, 3])
    assert result == []


def test_empty_universal_set_returns_empty():
    result = set_complement([1, 2, 3], [])
    assert result == []


def test_elements_not_in_a():
    result = set_complement([10, 20], [5, 10, 15, 20, 25])
    assert result == [5, 15, 25]


def test_single_element_a_matching():
    result = set_complement([3], [1, 2, 3, 4, 5])
    assert result == [1, 2, 4, 5]


def test_a_elements_outside_universal_set():
    result = set_complement([99, 100], [1, 2, 3])
    assert result == [1, 2, 3]


def test_preserves_universal_set_order():
    result = set_complement([2], [4, 3, 1, 5])
    assert result == [4, 3, 1, 5]


def test_single_element_universal_in_a():
    result = set_complement([7], [7])
    assert result == []


def test_single_element_universal_not_in_a():
    result = set_complement([7], [8])
    assert result == [8]


if __name__ == "__main__":
    test_elements_in_universal_set_not_in_a()
    test_empty_a_returns_full_universal_set()
    test_a_equals_universal_set_returns_empty()
    test_empty_universal_set_returns_empty()
    test_elements_not_in_a()
    test_single_element_a_matching()
    test_a_elements_outside_universal_set()
    test_preserves_universal_set_order()
    test_single_element_universal_in_a()
    test_single_element_universal_not_in_a()
    print("All tests passed!")
