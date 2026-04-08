import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
mod = importlib.import_module("lis-tabulation")
lis_length = mod.lis_length

assert lis_length([10, 9, 2, 5, 3, 7, 101, 18]) == 4, "[10,9,2,5,3,7,101,18] should return 4"
assert lis_length([0, 1, 0, 3, 2, 3]) == 4, "[0,1,0,3,2,3] should return 4"
assert lis_length([7, 7, 7]) == 1, "all equal should return 1"
assert lis_length([1]) == 1, "single element should return 1"
assert lis_length([]) == 0, "empty sequence should return 0"
assert lis_length([1, 2, 3, 4, 5]) == 5, "strictly ascending should return 5"
assert lis_length([5, 4, 3, 2, 1]) == 1, "strictly descending should return 1"
assert lis_length([1, 3, 3, 5]) == 3, "[1,3,3,5] strict increase should return 3"

if __name__ == "__main__":
    print("All tests passed!")
