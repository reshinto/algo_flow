import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
mod = importlib.import_module("coin-change-min-memoization")
coin_change_min_memoization = mod.coin_change_min_memoization

assert coin_change_min_memoization(0, [1, 5, 10]) == 0, "amount=0 should return 0"
assert coin_change_min_memoization(3, [2]) == -1, "amount=3 coins=[2] should return -1"
assert coin_change_min_memoization(5, [1, 5, 10]) == 1, "amount=5 coins=[1,5,10] should return 1"
assert coin_change_min_memoization(11, [1, 5, 10, 25]) == 2, "default input should return 2"
assert coin_change_min_memoization(11, [1, 5, 6, 9]) == 2, "amount=11 coins=[1,5,6,9] should return 2"
assert coin_change_min_memoization(3, [1, 2]) == 2, "amount=3 coins=[1,2] should return 2"
assert coin_change_min_memoization(6, [1, 3, 4]) == 2, "amount=6 coins=[1,3,4] should return 2"
assert coin_change_min_memoization(1, [1]) == 1, "amount=1 coins=[1] should return 1"
assert coin_change_min_memoization(5, []) == -1, "no coins should return -1"
assert coin_change_min_memoization(100, [1, 5, 10, 25]) == 4, "amount=100 should return 4"

if __name__ == "__main__":
    print("All tests passed!")
