import importlib

pairwise_sorting_network_module = importlib.import_module("pairwise-sorting-network")
pairwise_sorting_network = pairwise_sorting_network_module.pairwise_sorting_network


def test_sorts_unsorted_array():
    assert pairwise_sorting_network([5, 3, 8, 1, 4, 2, 7, 6]) == [1, 2, 3, 4, 5, 6, 7, 8]


def test_handles_already_sorted_array():
    assert pairwise_sorting_network([1, 2, 3, 4]) == [1, 2, 3, 4]


def test_handles_reverse_sorted_array():
    assert pairwise_sorting_network([4, 3, 2, 1]) == [1, 2, 3, 4]


def test_handles_single_element_array():
    assert pairwise_sorting_network([42]) == [42]


def test_handles_empty_array():
    assert pairwise_sorting_network([]) == []


def test_handles_array_with_negative_numbers():
    assert pairwise_sorting_network([3, -1, 0, -5, 2]) == [-5, -1, 0, 2, 3]


def test_does_not_mutate_original_array():
    original = [4, 2, 3, 1]
    sorted_result = pairwise_sorting_network(original)
    assert sorted_result == [1, 2, 3, 4]
    assert original == [4, 2, 3, 1]


if __name__ == "__main__":
    test_sorts_unsorted_array()
    test_handles_already_sorted_array()
    test_handles_reverse_sorted_array()
    test_handles_single_element_array()
    test_handles_empty_array()
    test_handles_array_with_negative_numbers()
    test_does_not_mutate_original_array()
    print("All tests passed!")
