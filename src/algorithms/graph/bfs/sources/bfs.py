from collections import deque


def breadth_first_search(adjacency_list: dict[str, list[str]], start_node_id: str) -> list[str]:
    visit_order: list[str] = []
    visited_set: set[str] = set()
    node_queue: deque[str] = deque([start_node_id])
    visited_set.add(start_node_id)

    while len(node_queue) > 0:
        current_node_id = node_queue.popleft()
        visit_order.append(current_node_id)

        neighbors = adjacency_list.get(current_node_id, [])
        for neighbor_id in neighbors:
            if neighbor_id not in visited_set:
                visited_set.add(neighbor_id)
                node_queue.append(neighbor_id)

    return visit_order
