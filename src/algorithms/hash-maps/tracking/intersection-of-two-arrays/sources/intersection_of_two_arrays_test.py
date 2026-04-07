import importlib

intersection_of_two_arrays = importlib.import_module(
    "intersection-of-two-arrays"
).intersection_of_two_arrays


def test_returns_2_for_default():
    assert intersection_of_two_arrays([1, 2, 2, 1], [2, 2]) == [2]


def test_returns_4_9_for_second_example():
    assert sorted(intersection_of_two_arrays([4, 9, 5], [9, 4, 9, 8, 4])) == [4, 9]


def test_returns_empty_for_no_overlap():
    assert intersection_of_two_arrays([1, 2], [3, 4]) == []


def test_returns_empty_for_empty_arrays():
    assert intersection_of_two_arrays([], []) == []


def test_returns_empty_when_first_empty():
    assert intersection_of_two_arrays([], [1, 2]) == []


def test_returns_empty_when_second_empty():
    assert intersection_of_two_arrays([1, 2], []) == []


def test_handles_identical_arrays():
    assert sorted(intersection_of_two_arrays([1, 2, 3], [1, 2, 3])) == [1, 2, 3]


def test_returns_single_element_intersection():
    assert intersection_of_two_arrays([5], [5]) == [5]


if __name__ == "__main__":
    test_returns_2_for_default()
    test_returns_4_9_for_second_example()
    test_returns_empty_for_no_overlap()
    test_returns_empty_for_empty_arrays()
    test_returns_empty_when_first_empty()
    test_returns_empty_when_second_empty()
    test_handles_identical_arrays()
    test_returns_single_element_intersection()
    print("All tests passed!")
