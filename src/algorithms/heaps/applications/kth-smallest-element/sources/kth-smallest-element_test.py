import importlib

kth_smallest_element = importlib.import_module("kth-smallest-element").kth_smallest_element


def test_3rd_smallest():
    assert kth_smallest_element([7, 10, 4, 3, 20, 15, 8], 3) == 7


def test_1st_smallest():
    assert kth_smallest_element([7, 10, 4, 3, 20, 15, 8], 1) == 3


def test_last_smallest():
    assert kth_smallest_element([7, 10, 4, 3, 20, 15, 8], 7) == 20


def test_single_element():
    assert kth_smallest_element([42], 1) == 42


def test_duplicates():
    assert kth_smallest_element([5, 5, 5, 5], 2) == 5


def test_negative_values():
    assert kth_smallest_element([-1, -5, -3, -2, -4], 2) == -4


def test_two_elements():
    assert kth_smallest_element([10, 20], 2) == 20


def test_2nd_smallest():
    assert kth_smallest_element([7, 10, 4, 3, 20, 15, 8], 2) == 4


if __name__ == "__main__":
    test_3rd_smallest()
    test_1st_smallest()
    test_last_smallest()
    test_single_element()
    test_duplicates()
    test_negative_values()
    test_two_elements()
    test_2nd_smallest()
    print("All tests passed!")
