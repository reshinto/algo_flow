import importlib

last_stone_weight = importlib.import_module("last-stone-weight").last_stone_weight


def test_default_input():
    assert last_stone_weight([2, 7, 4, 1, 8, 1]) == 1


def test_single_stone():
    assert last_stone_weight([1]) == 1


def test_equal_pair():
    assert last_stone_weight([5, 5]) == 0


def test_unequal_pair():
    assert last_stone_weight([3, 7]) == 4


def test_one_three():
    assert last_stone_weight([1, 3]) == 2


def test_three_equal():
    assert last_stone_weight([1, 1, 1]) == 1


def test_four_equal():
    assert last_stone_weight([4, 4, 4, 4]) == 0


def test_10_4_2_10():
    assert last_stone_weight([10, 4, 2, 10]) == 2


def test_result_non_negative():
    result = last_stone_weight([2, 7, 4, 1, 8, 1])
    assert result >= 0


if __name__ == "__main__":
    test_default_input()
    test_single_stone()
    test_equal_pair()
    test_unequal_pair()
    test_one_three()
    test_three_equal()
    test_four_equal()
    test_10_4_2_10()
    test_result_non_negative()
    print("All tests passed!")
