import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

mod = importlib.import_module("design-circular-deque")
design_circular_deque = mod.design_circular_deque

assert design_circular_deque(["pushBack 1", "pushBack 2", "pushBack 3"], 3) == ["true", "true", "true"]
assert design_circular_deque(["pushBack 1", "pushBack 2", "pushBack 3", "pushBack 4"], 3) == ["true", "true", "true", "full"]
assert design_circular_deque(["popFront"], 3) == ["empty"]
assert design_circular_deque(["popBack"], 3) == ["empty"]
assert design_circular_deque(["pushBack 1", "pushBack 2", "pushBack 3", "popFront", "popFront", "popFront"], 3) == ["true", "true", "true", "1", "2", "3"]
assert design_circular_deque(["pushFront 1", "pushFront 2", "pushFront 3", "popFront", "popFront", "popFront"], 3) == ["true", "true", "true", "3", "2", "1"]
assert design_circular_deque(["pushBack 10", "pushBack 20", "popBack"], 3) == ["true", "true", "20"]
assert design_circular_deque(["pushBack 1", "pushFront 2", "popBack", "pushBack 3"], 3) == ["true", "true", "1", "true"]
assert design_circular_deque(["pushBack 10", "pushBack 20", "peekFront"], 3) == ["true", "true", "10"]
assert design_circular_deque(["pushBack 10", "pushBack 20", "peekRear"], 3) == ["true", "true", "20"]
assert design_circular_deque(["peekFront", "peekRear"], 3) == ["empty", "empty"]
assert design_circular_deque(["pushBack 42", "popFront", "pushBack 99", "popFront"], 1) == ["true", "42", "true", "99"]
assert design_circular_deque(["pushBack 1", "pushBack 2", "pushFront 0"], 2) == ["true", "true", "full"]
assert design_circular_deque(["pushBack 1", "pushFront 2", "peekFront", "peekRear"], 3) == ["true", "true", "2", "1"]

if __name__ == "__main__":
    print("All tests passed!")
