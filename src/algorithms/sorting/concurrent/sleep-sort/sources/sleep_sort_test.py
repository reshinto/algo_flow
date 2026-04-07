import importlib

sleep_sort_module = importlib.import_module("sleep-sort")
sleep_sort = sleep_sort_module.sleep_sort


def test_sorts_unsorted_array():
    assert sleep_sort([5, 3, 8, 1, 4, 2, 7, 6]) == [1, 2, 3, 4, 5, 6, 7, 8]


def test_handles_already_sorted_array():
    assert sleep_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]


def test_handles_reverse_sorted_array():
    assert sleep_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]


def test_handles_array_with_duplicate_values():
    assert sleep_sort([3, 1, 4, 1, 5, 9, 2, 6]) == [1, 1, 2, 3, 4, 5, 6, 9]


def test_handles_single_element_array():
    assert sleep_sort([42]) == [42]


def test_handles_empty_array():
    assert sleep_sort([]) == []


def test_does_not_mutate_original_array():
    original = [3, 1, 2]
    sorted_result = sleep_sort(original)
    assert sorted_result == [1, 2, 3]
    assert original == [3, 1, 2]


if __name__ == "__main__":
    test_sorts_unsorted_array()
    test_handles_already_sorted_array()
    test_handles_reverse_sorted_array()
    test_handles_array_with_duplicate_values()
    test_handles_single_element_array()
    test_handles_empty_array()
    test_does_not_mutate_original_array()
    print("All tests passed!")
