import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
mod = importlib.import_module("house-robber-tabulation")
house_robber_tabulation = mod.house_robber_tabulation

assert house_robber_tabulation([]) == 0, "empty array should return 0"
assert house_robber_tabulation([5]) == 5, "[5] should return 5"
assert house_robber_tabulation([2, 7]) == 7, "[2,7] should return 7"
assert house_robber_tabulation([2, 7, 9, 3, 1]) == 12, "[2,7,9,3,1] should return 12"
assert house_robber_tabulation([1, 2, 3, 1]) == 4, "[1,2,3,1] should return 4"

if __name__ == "__main__":
    print("All tests passed!")
