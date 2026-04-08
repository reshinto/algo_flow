import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("best-time-buy-sell")
best_time_buy_sell = module.best_time_buy_sell


def test_classic_example():
    result = best_time_buy_sell([7, 1, 5, 3, 6, 4])
    assert result["max_profit"] == 5
    assert result["buy_day"] == 1
    assert result["sell_day"] == 4


def test_always_decreasing():
    result = best_time_buy_sell([7, 6, 4, 3, 1])
    assert result["max_profit"] == 0


def test_strictly_increasing():
    result = best_time_buy_sell([1, 2, 3, 4, 5])
    assert result["max_profit"] == 4
    assert result["buy_day"] == 0
    assert result["sell_day"] == 4


def test_single_element():
    result = best_time_buy_sell([42])
    assert result["max_profit"] == 0


def test_empty_array():
    result = best_time_buy_sell([])
    assert result["max_profit"] == 0
    assert result["buy_day"] == -1
    assert result["sell_day"] == -1


def test_all_identical():
    result = best_time_buy_sell([5, 5, 5, 5, 5])
    assert result["max_profit"] == 0


def test_price_spike_middle():
    result = best_time_buy_sell([1, 100, 2, 3])
    assert result["max_profit"] == 99
    assert result["buy_day"] == 0
    assert result["sell_day"] == 1


def test_best_at_end():
    result = best_time_buy_sell([9, 8, 7, 1, 10])
    assert result["max_profit"] == 9
    assert result["buy_day"] == 3
    assert result["sell_day"] == 4


def test_multiple_minimums():
    result = best_time_buy_sell([5, 3, 1, 2, 8])
    assert result["max_profit"] == 7
    assert result["buy_day"] == 2
    assert result["sell_day"] == 4


def test_two_elements_profitable():
    result = best_time_buy_sell([1, 9])
    assert result["max_profit"] == 8
    assert result["buy_day"] == 0
    assert result["sell_day"] == 1


if __name__ == "__main__":
    test_classic_example()
    test_always_decreasing()
    test_strictly_increasing()
    test_single_element()
    test_empty_array()
    test_all_identical()
    test_price_spike_middle()
    test_best_at_end()
    test_multiple_minimums()
    test_two_elements_profitable()
    print("All tests passed!")
