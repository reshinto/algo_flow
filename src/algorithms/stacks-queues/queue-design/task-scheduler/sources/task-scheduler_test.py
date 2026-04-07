import importlib

mod = importlib.import_module("task-scheduler")
task_scheduler_queue = mod.task_scheduler_queue

assert task_scheduler_queue(["A", "A", "A", "B", "B", "B"], 2) == 8
assert task_scheduler_queue(["A", "A", "B", "B", "C", "C"], 1) == 6
assert task_scheduler_queue(["A", "A", "A", "B", "B", "B"], 0) == 6
assert task_scheduler_queue(["A", "A", "A"], 100) == 203
assert task_scheduler_queue(["A"], 5) == 1
assert task_scheduler_queue(["A", "A", "B", "B"], 2) == 5
assert task_scheduler_queue(["A", "A", "A", "A"], 0) == 4
assert task_scheduler_queue(["A", "B", "C", "D", "E", "F"], 3) >= 6

distinct_tasks = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
assert task_scheduler_queue(distinct_tasks, 25) == 26

first = task_scheduler_queue(["A", "A", "A", "B", "B", "B"], 2)
second = task_scheduler_queue(["A", "A", "A", "B", "B", "B"], 2)
assert first == second

if __name__ == "__main__":
    print("All tests passed!")
