# Design Circular Queue — fixed-capacity ring buffer with front/rear pointers (LeetCode 622)
from typing import List, Optional


def design_circular_queue(operations: List[str], capacity: int) -> List[str]:
    buffer: List[Optional[int]] = [None] * capacity  # @step:initialize
    front_index: int = -1  # @step:initialize
    rear_index: int = -1  # @step:initialize
    queue_size: int = 0  # @step:initialize
    results: List[str] = []  # @step:initialize

    for operation in operations:  # @step:visit
        if operation.startswith("enqueue"):
            parts = operation.split(" ")  # @step:enqueue
            value = int(parts[1])  # @step:enqueue

            if queue_size == capacity:  # @step:enqueue
                results.append("full")  # @step:enqueue
            else:
                if front_index == -1:  # @step:enqueue
                    front_index = 0  # @step:enqueue
                rear_index = (rear_index + 1) % capacity  # @step:enqueue
                buffer[rear_index] = value  # @step:enqueue
                queue_size += 1  # @step:enqueue
                results.append("true")  # @step:enqueue

        elif operation == "dequeue":
            if queue_size == 0:  # @step:dequeue
                results.append("empty")  # @step:dequeue
            else:
                dequeued_value = buffer[front_index]  # @step:dequeue
                buffer[front_index] = None  # @step:dequeue
                if front_index == rear_index:  # @step:dequeue
                    front_index = -1  # @step:dequeue
                    rear_index = -1  # @step:dequeue
                else:
                    front_index = (front_index + 1) % capacity  # @step:dequeue
                queue_size -= 1  # @step:dequeue
                results.append(str(dequeued_value))  # @step:dequeue

        elif operation == "front":
            if front_index == -1:  # @step:peek
                results.append("empty")  # @step:peek
            else:
                results.append(str(buffer[front_index]))  # @step:peek

        elif operation == "rear":
            if rear_index == -1:  # @step:peek
                results.append("empty")  # @step:peek
            else:
                results.append(str(buffer[rear_index]))  # @step:peek

    return results  # @step:complete
