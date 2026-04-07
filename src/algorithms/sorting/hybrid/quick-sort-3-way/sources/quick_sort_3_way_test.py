import importlib

quick_sort_3_way_module = importlib.import_module("quick-sort-3-way")
quick_sort_3_way = quick_sort_3_way_module.quick_sort_3_way


def test_sorts_unsorted_array():
    assert quick_sort_3_way([64, 34, 25, 12, 22, 11, 90]) == [11, 12, 22, 25, 34, 64, 90]


def test_handles_already_sorted_array():
    assert quick_sort_3_way([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]


def test_handles_reverse_sorted_array():
    assert quick_sort_3_way([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]


def test_handles_array_with_many_duplicates_3_way_specialization():
    assert quick_sort_3_way([3, 3, 3, 3, 3]) == [3, 3, 3, 3, 3]


def test_handles_array_with_some_duplicate_values():
    assert quick_sort_3_way([3, 1, 4, 1, 5, 9, 2, 6, 5]) == [1, 1, 2, 3, 4, 5, 5, 6, 9]


def test_handles_single_element_array():
    assert quick_sort_3_way([42]) == [42]


def test_handles_empty_array():
    assert quick_sort_3_way([]) == []


def test_handles_array_with_negative_numbers():
    assert quick_sort_3_way([3, -1, 0, -5, 2]) == [-5, -1, 0, 2, 3]


def test_does_not_mutate_original_array():
    original = [3, 1, 2]
    sorted_result = quick_sort_3_way(original)
    assert sorted_result == [1, 2, 3]
    assert original == [3, 1, 2]


if __name__ == "__main__":
    test_sorts_unsorted_array()
    test_handles_already_sorted_array()
    test_handles_reverse_sorted_array()
    test_handles_array_with_many_duplicates_3_way_specialization()
    test_handles_array_with_some_duplicate_values()
    test_handles_single_element_array()
    test_handles_empty_array()
    test_handles_array_with_negative_numbers()
    test_does_not_mutate_original_array()
    print("All tests passed!")
