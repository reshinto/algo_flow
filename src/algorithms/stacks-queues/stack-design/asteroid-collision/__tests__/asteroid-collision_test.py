import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

mod = importlib.import_module("asteroid-collision")
asteroid_collision = mod.asteroid_collision

assert asteroid_collision([5, 10, -5]) == [5, 10]
assert asteroid_collision([8, -8]) == []
assert asteroid_collision([10, 2, -5]) == [10]
assert asteroid_collision([-2, -1, 1, 2]) == [-2, -1, 1, 2]
assert asteroid_collision([1, -1, 1, -1]) == []
assert asteroid_collision([1, 2, 3, -10]) == [-10]
assert asteroid_collision([-5, -3]) == [-5, -3]
assert asteroid_collision([7]) == [7]
assert asteroid_collision([]) == []
assert asteroid_collision([5, 3, 1, -4]) == [5]

if __name__ == "__main__":
    print("All tests passed!")
