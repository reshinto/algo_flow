# Tarjan's SCC — finds strongly connected components using DFS with discovery and low-link values
def tarjan_scc(adjacency_list: dict[str, list[str]], node_ids: list[str]) -> list[list[str]]:
    discovery_time: dict[str, int] = {}  # @step:initialize
    low_link: dict[str, int] = {}  # @step:initialize
    on_stack: dict[str, bool] = {}  # @step:initialize
    node_stack: list[str] = []  # @step:initialize
    components: list[list[str]] = []  # @step:initialize
    timer = [0]  # @step:initialize

    def dfs(node_id: str) -> None:
        discovery_time[node_id] = timer[0]  # @step:visit
        low_link[node_id] = timer[0]  # @step:visit
        timer[0] += 1  # @step:visit
        node_stack.append(node_id)  # @step:push-stack
        on_stack[node_id] = True  # @step:push-stack

        neighbors = adjacency_list.get(node_id, [])
        for neighbor_id in neighbors:
            if neighbor_id not in discovery_time:
                dfs(neighbor_id)  # @step:visit-edge
                low_link[node_id] = min(low_link[node_id], low_link[neighbor_id])  # @step:visit-edge
            elif on_stack.get(neighbor_id, False):
                low_link[node_id] = min(low_link[node_id], discovery_time[neighbor_id])  # @step:visit-edge

        if low_link[node_id] == discovery_time[node_id]:
            component: list[str] = []  # @step:pop-stack
            while True:
                popped_node_id = node_stack.pop()  # @step:pop-stack
                on_stack[popped_node_id] = False  # @step:pop-stack
                component.append(popped_node_id)  # @step:pop-stack
                if popped_node_id == node_id:
                    break
            components.append(component)  # @step:assign-component

    for node_id in node_ids:
        if node_id not in discovery_time:
            dfs(node_id)  # @step:initialize

    return components  # @step:complete
