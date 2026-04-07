import importlib

bozo_sort_module = importlib.import_module("bozo-sort")
bozo_sort = bozo_sort_module.bozo_sort


def test_sorts_small_array_using_seeded_prng():
    result = bozo_sort([3, 1, 2])
    assert result == [1, 2, 3]


def test_handles_already_sorted_array():
    assert bozo_sort([1, 2, 3]) == [1, 2, 3]


def test_handles_single_element_array():
    assert bozo_sort([42]) == [42]


def test_handles_empty_array():
    assert bozo_sort([]) == []


def test_produces_result_with_same_length_as_input():
    result = bozo_sort([3, 1, 2])
    assert len(result) == 3


def test_does_not_mutate_original_array():
    original = [3, 1, 2]
    sorted_result = bozo_sort(original)
    assert sorted_result == [1, 2, 3]
    assert original == [3, 1, 2]


def test_handles_2_element_array():
    result = bozo_sort([2, 1])
    assert result == [1, 2]


if __name__ == "__main__":
    test_sorts_small_array_using_seeded_prng()
    test_handles_already_sorted_array()
    test_handles_single_element_array()
    test_handles_empty_array()
    test_produces_result_with_same_length_as_input()
    test_does_not_mutate_original_array()
    test_handles_2_element_array()
    print("All tests passed!")
