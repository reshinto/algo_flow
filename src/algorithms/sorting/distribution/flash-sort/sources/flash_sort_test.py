import importlib

flash_sort_module = importlib.import_module("flash-sort")
flash_sort = flash_sort_module.flash_sort


def test_sorts_unsorted_array():
    assert flash_sort([64, 34, 25, 12, 22, 11, 90]) == [11, 12, 22, 25, 34, 64, 90]


def test_handles_already_sorted_array():
    assert flash_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]


def test_handles_reverse_sorted_array():
    assert flash_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]


def test_handles_array_with_duplicate_values():
    assert flash_sort([3, 1, 4, 1, 5, 9, 2, 6, 5]) == [1, 1, 2, 3, 4, 5, 5, 6, 9]


def test_handles_single_element_array():
    assert flash_sort([42]) == [42]


def test_handles_empty_array():
    assert flash_sort([]) == []


def test_handles_all_identical_elements():
    assert flash_sort([7, 7, 7, 7]) == [7, 7, 7, 7]


def test_does_not_mutate_original_array():
    original = [3, 1, 2]
    sorted_result = flash_sort(original)
    assert sorted_result == [1, 2, 3]
    assert original == [3, 1, 2]


if __name__ == "__main__":
    test_sorts_unsorted_array()
    test_handles_already_sorted_array()
    test_handles_reverse_sorted_array()
    test_handles_array_with_duplicate_values()
    test_handles_single_element_array()
    test_handles_empty_array()
    test_handles_all_identical_elements()
    test_does_not_mutate_original_array()
    print("All tests passed!")
