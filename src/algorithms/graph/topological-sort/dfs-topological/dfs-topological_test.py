import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("dfs-topological")
dfs_topological_sort = module.dfs_topological_sort


def is_valid_topological_order(order, adjacency_list):
    position = {node: idx for idx, node in enumerate(order)}
    for source, neighbors in adjacency_list.items():
        for target in neighbors:
            if position.get(source) is None or position.get(target) is None:
                return False
            if position[source] >= position[target]:
                return False
    return True


def test_produces_valid_topological_order_for_default_dag():
    adj = {"A": ["B","C"], "B": ["D"], "C": ["D","E"], "D": ["F"], "E": ["F"], "F": []}
    result = dfs_topological_sort(adj, ["A","B","C","D","E","F"])
    assert len(result) == 6
    assert is_valid_topological_order(result, adj)


def test_places_source_node_first_in_linear_chain():
    adj = {"A": ["B"], "B": ["C"], "C": ["D"], "D": []}
    result = dfs_topological_sort(adj, ["A","B","C","D"])
    assert result == ["A","B","C","D"]
    assert is_valid_topological_order(result, adj)


def test_handles_single_node_with_no_edges():
    adj = {"A": []}
    result = dfs_topological_sort(adj, ["A"])
    assert result == ["A"]


def test_handles_diamond_shaped_dag():
    adj = {"A": ["B","C"], "B": ["D"], "C": ["D"], "D": []}
    result = dfs_topological_sort(adj, ["A","B","C","D"])
    assert len(result) == 4
    assert is_valid_topological_order(result, adj)
    assert result[0] == "A"
    assert result[-1] == "D"


def test_returns_all_nodes_for_fully_independent_node_set():
    adj = {"A": [], "B": [], "C": [], "D": []}
    result = dfs_topological_sort(adj, ["A","B","C","D"])
    assert len(result) == 4
    assert set(result) == {"A","B","C","D"}


def test_handles_graph_where_multiple_root_nodes_exist():
    adj = {"A": ["C"], "B": ["C"], "C": []}
    result = dfs_topological_sort(adj, ["A","B","C"])
    assert len(result) == 3
    assert is_valid_topological_order(result, adj)
    assert result.index("C") > result.index("A")
    assert result.index("C") > result.index("B")


def test_does_not_revisit_already_visited_nodes():
    adj = {"A": ["C"], "B": ["C"], "C": ["D"], "D": []}
    result = dfs_topological_sort(adj, ["A","B","C","D"])
    assert len(result) == 4
    assert result.count("C") == 1
    assert result.count("D") == 1
    assert is_valid_topological_order(result, adj)


if __name__ == "__main__":
    test_produces_valid_topological_order_for_default_dag()
    test_places_source_node_first_in_linear_chain()
    test_handles_single_node_with_no_edges()
    test_handles_diamond_shaped_dag()
    test_returns_all_nodes_for_fully_independent_node_set()
    test_handles_graph_where_multiple_root_nodes_exist()
    test_does_not_revisit_already_visited_nodes()
    print("All tests passed!")
