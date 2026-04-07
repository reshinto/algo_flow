import importlib

n_repeated_element = importlib.import_module("n-repeated-element").n_repeated_element


def test_returns_3_for_1_2_3_3():
    assert n_repeated_element([1, 2, 3, 3]) == 3


def test_returns_2_for_2_1_2_5_3_2():
    assert n_repeated_element([2, 1, 2, 5, 3, 2]) == 2


def test_returns_5_for_five_repeated():
    assert n_repeated_element([5, 1, 5, 2, 5, 3, 5, 4]) == 5


def test_returns_repeated_element_for_two_element_array():
    assert n_repeated_element([1, 1]) == 1


def test_returns_9_for_9_9_1_2():
    assert n_repeated_element([9, 9, 1, 2]) == 9


def test_handles_element_at_the_end():
    assert n_repeated_element([1, 2, 3, 4, 5, 3, 3, 3]) == 3


def test_returns_repeated_element_for_all_same():
    assert n_repeated_element([7, 7, 7, 7]) == 7


def test_works_with_negative_numbers():
    assert n_repeated_element([-1, -1, 2, 3]) == -1


if __name__ == "__main__":
    test_returns_3_for_1_2_3_3()
    test_returns_2_for_2_1_2_5_3_2()
    test_returns_5_for_five_repeated()
    test_returns_repeated_element_for_two_element_array()
    test_returns_9_for_9_9_1_2()
    test_handles_element_at_the_end()
    test_returns_repeated_element_for_all_same()
    test_works_with_negative_numbers()
    print("All tests passed!")
