# Design Circular Deque — fixed-capacity ring buffer with front/rear insertion and removal (LeetCode 641)
from typing import List, Optional


def design_circular_deque(operations: List[str], capacity: int) -> List[str]:
    buffer: List[Optional[int]] = [None] * capacity  # @step:initialize
    front_index: int = -1  # @step:initialize
    rear_index: int = -1  # @step:initialize
    deque_size: int = 0  # @step:initialize
    results: List[str] = []  # @step:initialize

    for operation in operations:  # @step:visit
        if operation.startswith("pushBack"):
            parts = operation.split(" ")  # @step:enqueue
            value = int(parts[1])  # @step:enqueue

            if deque_size == capacity:  # @step:enqueue
                results.append("full")  # @step:enqueue
            else:
                if front_index == -1:  # @step:enqueue
                    front_index = 0  # @step:enqueue
                rear_index = (rear_index + 1) % capacity  # @step:enqueue
                buffer[rear_index] = value  # @step:enqueue
                deque_size += 1  # @step:enqueue
                results.append("true")  # @step:enqueue

        elif operation.startswith("pushFront"):
            parts = operation.split(" ")  # @step:enqueue-front
            value = int(parts[1])  # @step:enqueue-front

            if deque_size == capacity:  # @step:enqueue-front
                results.append("full")  # @step:enqueue-front
            else:
                if front_index == -1:  # @step:enqueue-front
                    front_index = 0  # @step:enqueue-front
                    rear_index = 0  # @step:enqueue-front
                else:
                    front_index = (front_index - 1 + capacity) % capacity  # @step:enqueue-front
                buffer[front_index] = value  # @step:enqueue-front
                deque_size += 1  # @step:enqueue-front
                results.append("true")  # @step:enqueue-front

        elif operation == "popFront":
            if deque_size == 0:  # @step:dequeue
                results.append("empty")  # @step:dequeue
            else:
                popped_value = buffer[front_index]  # @step:dequeue
                buffer[front_index] = None  # @step:dequeue
                if front_index == rear_index:  # @step:dequeue
                    front_index = -1  # @step:dequeue
                    rear_index = -1  # @step:dequeue
                else:
                    front_index = (front_index + 1) % capacity  # @step:dequeue
                deque_size -= 1  # @step:dequeue
                results.append(str(popped_value))  # @step:dequeue

        elif operation == "popBack":
            if deque_size == 0:  # @step:dequeue-rear
                results.append("empty")  # @step:dequeue-rear
            else:
                popped_value = buffer[rear_index]  # @step:dequeue-rear
                buffer[rear_index] = None  # @step:dequeue-rear
                if front_index == rear_index:  # @step:dequeue-rear
                    front_index = -1  # @step:dequeue-rear
                    rear_index = -1  # @step:dequeue-rear
                else:
                    rear_index = (rear_index - 1 + capacity) % capacity  # @step:dequeue-rear
                deque_size -= 1  # @step:dequeue-rear
                results.append(str(popped_value))  # @step:dequeue-rear

        elif operation == "peekFront":
            if front_index == -1:  # @step:peek
                results.append("empty")  # @step:peek
            else:
                results.append(str(buffer[front_index]))  # @step:peek

        elif operation == "peekRear":
            if rear_index == -1:  # @step:peek
                results.append("empty")  # @step:peek
            else:
                results.append(str(buffer[rear_index]))  # @step:peek

    return results  # @step:complete
