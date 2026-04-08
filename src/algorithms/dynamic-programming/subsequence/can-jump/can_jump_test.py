import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
mod = importlib.import_module("can-jump")
can_jump = mod.can_jump

assert can_jump([2, 3, 1, 1, 4]) == True, "[2,3,1,1,4] should return True"
assert can_jump([3, 2, 1, 0, 4]) == False, "[3,2,1,0,4] should return False"
assert can_jump([0]) == True, "[0] single element should return True"
assert can_jump([1, 2]) == True, "[1,2] should return True"
assert can_jump([0, 1]) == False, "[0,1] blocked at start should return False"
assert can_jump([5, 0, 0, 0, 0, 1]) == True, "[5,0,0,0,0,1] long jump should return True"
assert can_jump([0, 0, 0]) == False, "[0,0,0] all zeros should return False"
assert can_jump([1, 0]) == True, "[1,0] one step to end should return True"

if __name__ == "__main__":
    print("All tests passed!")
