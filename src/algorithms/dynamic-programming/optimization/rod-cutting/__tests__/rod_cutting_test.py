import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
mod = importlib.import_module("rod-cutting")
rod_cutting = mod.rod_cutting

assert rod_cutting([1, 5, 8, 9, 10, 17, 17, 20]) == 22, "default input should return 22"
assert rod_cutting([1, 5]) == 5, "[1,5] should return 5"
assert rod_cutting([3, 5, 8]) == 9, "[3,5,8] should return 9"
assert rod_cutting([1]) == 1, "[1] should return 1"
assert rod_cutting([]) == 0, "empty should return 0"
assert rod_cutting([10]) == 10, "[10] should return 10"
assert rod_cutting([3, 1, 1]) == 9, "[3,1,1] three unit pieces should return 9"
assert rod_cutting([1, 2, 10]) == 10, "[1,2,10] no cut is optimal"
assert rod_cutting([2, 2, 2]) == 6, "[2,2,2] uniform prices should return 6"

if __name__ == "__main__":
    print("All tests passed!")
