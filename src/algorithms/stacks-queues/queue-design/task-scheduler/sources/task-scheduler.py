# Task Scheduler — greedy formula with cooldown queue simulation (LeetCode 621)
from collections import deque
from typing import List, Tuple


def task_scheduler_queue(tasks: List[str], cooldown: int) -> int:
    freq_map: dict[str, int] = {}  # @step:initialize
    for task in tasks:  # @step:initialize
        freq_map[task] = freq_map.get(task, 0) + 1  # @step:initialize

    max_freq: int = 0  # @step:initialize
    max_freq_count: int = 0  # @step:initialize

    for freq in freq_map.values():  # @step:visit
        if freq > max_freq:  # @step:compare
            max_freq = freq  # @step:compare
            max_freq_count = 1  # @step:compare
        elif freq == max_freq:  # @step:compare
            max_freq_count += 1  # @step:compare

    # Queue holds (taskName, remainingFreq, availableAtTime) for cooling-down tasks
    cooldown_queue: deque[Tuple[str, int, int]] = deque()  # @step:enqueue

    # Sorted descending by frequency — acts as a max-heap
    task_heap = sorted(
        [{"task": task, "freq": freq} for task, freq in freq_map.items()],
        key=lambda entry: -entry["freq"],
    )  # @step:enqueue

    current_time: int = 0  # @step:enqueue

    while task_heap or cooldown_queue:  # @step:visit
        current_time += 1  # @step:visit

        # Release tasks from the cooldown queue when their wait is over
        if cooldown_queue and cooldown_queue[0][2] <= current_time:  # @step:dequeue
            task_name, remaining_freq, _ = cooldown_queue.popleft()  # @step:dequeue
            task_heap.append({"task": task_name, "freq": remaining_freq})  # @step:dequeue
            task_heap.sort(key=lambda entry: -entry["freq"])  # @step:dequeue

        # Execute the highest-frequency available task and enqueue it to cool down
        if task_heap:  # @step:enqueue
            top_entry = task_heap.pop(0)  # @step:enqueue
            remaining_freq = top_entry["freq"] - 1  # @step:enqueue
            if remaining_freq > 0:  # @step:enqueue
                cooldown_queue.append(  # @step:enqueue
                    (top_entry["task"], remaining_freq, current_time + cooldown + 1)
                )  # @step:enqueue

    # Greedy formula — closed-form solution is equivalent to the simulation result
    formula_result = (max_freq - 1) * (cooldown + 1) + max_freq_count  # @step:complete
    return max(len(tasks), formula_result)  # @step:complete
