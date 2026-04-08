import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
mod = importlib.import_module("coin-change-ways")
coin_change_ways = mod.coin_change_ways

assert coin_change_ways(5, [1, 2, 5]) == 4, "amount=5 coins=[1,2,5] should return 4"
assert coin_change_ways(3, [2]) == 0, "amount=3 coins=[2] should return 0"
assert coin_change_ways(0, [1]) == 1, "amount=0 coins=[1] should return 1"
assert coin_change_ways(5, [1, 2]) == 3, "amount=5 coins=[1,2] should return 3"
assert coin_change_ways(2, [2]) == 1, "amount=2 coins=[2] should return 1"
assert coin_change_ways(1, [2, 5]) == 0, "amount=1 coins=[2,5] should return 0"
assert coin_change_ways(6, [3]) == 1, "amount=6 coins=[3] should return 1"
assert coin_change_ways(10, [1, 2, 5]) == 10, "amount=10 coins=[1,2,5] should return 10"

if __name__ == "__main__":
    print("All tests passed!")
