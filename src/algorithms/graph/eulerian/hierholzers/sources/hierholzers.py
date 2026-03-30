from collections import defaultdict


# Hierholzer's Algorithm — find an Eulerian circuit using subcircuit splicing
def hierholzers_algorithm(adjacency_list: dict[str, list[str]], start_node_id: str) -> list[str]:
    # Build a mutable copy of the adjacency list so edges can be removed as used
    remaining_edges: dict[str, list[str]] = defaultdict(list)  # @step:initialize
    for node_id, neighbors in adjacency_list.items():
        remaining_edges[node_id] = list(neighbors)  # @step:initialize

    circuit: list[str] = []  # @step:initialize
    node_stack: list[str] = [start_node_id]  # @step:initialize,push-stack

    while len(node_stack) > 0:
        current_node_id = node_stack[-1]  # @step:pop-stack
        current_neighbors = remaining_edges[current_node_id]

        if len(current_neighbors) > 0:
            next_node_id = current_neighbors.pop(0)  # @step:use-edge
            # For undirected graphs, remove the reverse edge as well
            reverse_neighbors = remaining_edges[next_node_id]
            if current_node_id in reverse_neighbors:
                reverse_neighbors.remove(current_node_id)  # @step:use-edge
            node_stack.append(next_node_id)  # @step:push-stack
        else:
            # No unused edges from current_node_id — add it to the circuit
            node_stack.pop()  # @step:pop-stack
            circuit.insert(0, current_node_id)  # @step:visit

    return circuit  # @step:complete
