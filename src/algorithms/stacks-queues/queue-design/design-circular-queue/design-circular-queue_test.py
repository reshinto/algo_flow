import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("design-circular-queue")
design_circular_queue = mod.design_circular_queue

assert design_circular_queue(["enqueue 1", "enqueue 2", "enqueue 3"], 3) == ["true", "true", "true"]
assert design_circular_queue(["enqueue 1", "enqueue 2", "enqueue 3", "enqueue 4"], 3) == ["true", "true", "true", "full"]
assert design_circular_queue(["dequeue"], 3) == ["empty"]
assert design_circular_queue(["enqueue 1", "enqueue 2", "enqueue 3", "dequeue", "dequeue", "dequeue"], 3) == ["true", "true", "true", "1", "2", "3"]
assert design_circular_queue(["enqueue 1", "enqueue 2", "dequeue", "enqueue 3", "enqueue 4"], 3) == ["true", "true", "1", "true", "true"]
assert design_circular_queue(["enqueue 5", "dequeue", "enqueue 7"], 2) == ["true", "5", "true"]
assert design_circular_queue(["enqueue 10", "enqueue 20", "front"], 3) == ["true", "true", "10"]
assert design_circular_queue(["enqueue 10", "enqueue 20", "rear"], 3) == ["true", "true", "20"]
assert design_circular_queue(["front", "rear"], 3) == ["empty", "empty"]
assert design_circular_queue(["enqueue 1", "enqueue 2", "dequeue", "enqueue 3"], 3) == ["true", "true", "1", "true"]
assert design_circular_queue(["enqueue 42", "dequeue", "enqueue 99", "dequeue"], 1) == ["true", "42", "true", "99"]
assert design_circular_queue(["enqueue 1", "dequeue", "dequeue"], 2) == ["true", "1", "empty"]

if __name__ == "__main__":
    print("All tests passed!")
