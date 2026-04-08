import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
mod = importlib.import_module("coin-change-min-tabulation")
coin_change_min_tabulation = mod.coin_change_min_tabulation

assert coin_change_min_tabulation(11, [1, 5, 10, 25]) == 2, "default input should return 2"
assert coin_change_min_tabulation(3, [2]) == -1, "amount=3 coins=[2] should return -1"
assert coin_change_min_tabulation(0, [1]) == 0, "amount=0 should return 0"
assert coin_change_min_tabulation(6, [1, 3, 4]) == 2, "amount=6 coins=[1,3,4] should return 2"
assert coin_change_min_tabulation(25, [1, 5, 10, 25]) == 1, "exact coin should return 1"
assert coin_change_min_tabulation(7, [3, 6]) == -1, "amount=7 coins=[3,6] should return -1"
assert coin_change_min_tabulation(10, [5]) == 2, "amount=10 coins=[5] should return 2"

if __name__ == "__main__":
    print("All tests passed!")
