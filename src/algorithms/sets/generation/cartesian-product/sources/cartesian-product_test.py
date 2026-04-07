import importlib

cartesian_product_module = importlib.import_module("cartesian-product")
cartesian_product = cartesian_product_module.cartesian_product


def test_default_input():
    result = cartesian_product([1, 2, 3], [4, 5])
    assert result == [[1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]


def test_single_element_sets():
    result = cartesian_product([7], [9])
    assert result == [[7, 9]]


def test_n_times_m_pairs():
    result = cartesian_product([1, 2], [3, 4])
    assert len(result) == 4


def test_empty_set_a():
    result = cartesian_product([], [4, 5])
    assert result == []


def test_empty_set_b():
    result = cartesian_product([1, 2, 3], [])
    assert result == []


def test_both_empty():
    result = cartesian_product([], [])
    assert result == []


def test_preserves_order():
    result = cartesian_product([10, 20], [1, 2])
    assert result[0] == [10, 1]
    assert result[1] == [10, 2]
    assert result[2] == [20, 1]
    assert result[3] == [20, 2]


def test_ordered_tuple_pairs():
    result = cartesian_product([5], [3, 7])
    assert result == [[5, 3], [5, 7]]


def test_duplicate_values():
    result = cartesian_product([1, 1], [2])
    assert result == [[1, 2], [1, 2]]


if __name__ == "__main__":
    test_default_input()
    test_single_element_sets()
    test_n_times_m_pairs()
    test_empty_set_a()
    test_empty_set_b()
    test_both_empty()
    test_preserves_order()
    test_ordered_tuple_pairs()
    test_duplicate_values()
    print("All tests passed!")
