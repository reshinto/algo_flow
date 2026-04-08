import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("best-time-buy-sell-unlimited")
best_time_buy_sell_unlimited = module.best_time_buy_sell_unlimited


def test_default_input():
    result = best_time_buy_sell_unlimited([7, 1, 5, 3, 6, 4])
    assert result["total_profit"] == 7, f"Expected 7, got {result['total_profit']}"


def test_empty_prices():
    result = best_time_buy_sell_unlimited([])
    assert result["total_profit"] == 0
    assert result["transactions"] == []


def test_single_price():
    result = best_time_buy_sell_unlimited([5])
    assert result["total_profit"] == 0


def test_always_falling():
    result = best_time_buy_sell_unlimited([5, 4, 3, 2, 1])
    assert result["total_profit"] == 0
    assert result["transactions"] == []


def test_strictly_increasing():
    result = best_time_buy_sell_unlimited([1, 2, 3, 4, 5])
    assert result["total_profit"] == 4


def test_alternating():
    result = best_time_buy_sell_unlimited([1, 5, 1, 5, 1, 5])
    assert result["total_profit"] == 12


def test_all_equal():
    result = best_time_buy_sell_unlimited([3, 3, 3, 3])
    assert result["total_profit"] == 0


def test_two_prices_gain():
    result = best_time_buy_sell_unlimited([1, 7])
    assert result["total_profit"] == 6
    assert len(result["transactions"]) == 1


def test_transaction_days():
    result = best_time_buy_sell_unlimited([1, 5, 3, 7])
    assert result["total_profit"] == 8
    assert len(result["transactions"]) == 2
    assert result["transactions"][0] == [0, 1]
    assert result["transactions"][1] == [2, 3]


if __name__ == "__main__":
    test_default_input()
    test_empty_prices()
    test_single_price()
    test_always_falling()
    test_strictly_increasing()
    test_alternating()
    test_all_equal()
    test_two_prices_gain()
    test_transaction_days()
    print("All tests passed!")
