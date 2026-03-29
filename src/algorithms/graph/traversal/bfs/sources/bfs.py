from collections import deque


# BFS — traverse level-by-level using a FIFO queue
def breadth_first_search(adjacency_list: dict[str, list[str]], start_node_id: str) -> list[str]:
    visit_order: list[str] = []  # @step:initialize
    visited_set: set[str] = set()  # @step:initialize
    node_queue: deque[str] = deque([start_node_id])  # @step:initialize
    visited_set.add(start_node_id)  # @step:initialize

    while len(node_queue) > 0:
        current_node_id = node_queue.popleft()  # @step:dequeue
        visit_order.append(current_node_id)  # @step:dequeue,visit

        # Mark as visited when enqueuing to avoid duplicates
        neighbors = adjacency_list.get(current_node_id, [])
        for neighbor_id in neighbors:
            if neighbor_id not in visited_set:  # @step:visit-edge
                visited_set.add(neighbor_id)  # @step:visit-edge
                node_queue.append(neighbor_id)  # @step:visit-edge,enqueue

    return visit_order  # @step:complete
