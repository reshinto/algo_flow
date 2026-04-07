import importlib

kth_largest_element = importlib.import_module("kth-largest-element").kth_largest_element


def test_3rd_largest():
    assert kth_largest_element([3, 1, 5, 12, 2, 11, 7, 9], 3) == 9


def test_1st_largest():
    assert kth_largest_element([3, 1, 5, 12, 2, 11, 7, 9], 1) == 12


def test_last_largest():
    assert kth_largest_element([3, 1, 5, 12, 2, 11, 7, 9], 8) == 1


def test_single_element():
    assert kth_largest_element([42], 1) == 42


def test_duplicates():
    assert kth_largest_element([5, 5, 5, 5], 2) == 5


def test_negative_values():
    assert kth_largest_element([-1, -5, -3, -2, -4], 2) == -2


def test_two_elements():
    assert kth_largest_element([10, 20], 2) == 10


def test_2nd_largest():
    assert kth_largest_element([7, 10, 4, 3, 20, 15, 8], 2) == 15


if __name__ == "__main__":
    test_3rd_largest()
    test_1st_largest()
    test_last_largest()
    test_single_element()
    test_duplicates()
    test_negative_values()
    test_two_elements()
    test_2nd_largest()
    print("All tests passed!")
