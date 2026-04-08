import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
cc_module = importlib.import_module("connected-components")
connected_components = cc_module.connected_components


def test_finds_three_disconnected_components():
    adjacency_list = {
        "A": ["B"],
        "B": ["A", "C"],
        "C": ["B"],
        "D": ["E"],
        "E": ["D"],
        "F": [],
    }
    result = connected_components(adjacency_list, ["A", "B", "C", "D", "E", "F"])
    assert len(result) == 3, f"Expected 3 components, got {len(result)}"
    component_sets = [frozenset(comp) for comp in result]
    assert frozenset(["A", "B", "C"]) in component_sets
    assert frozenset(["D", "E"]) in component_sets
    assert frozenset(["F"]) in component_sets


def test_returns_single_component_for_fully_connected_graph():
    adjacency_list = {
        "A": ["B", "C"],
        "B": ["A", "C"],
        "C": ["A", "B"],
    }
    result = connected_components(adjacency_list, ["A", "B", "C"])
    assert len(result) == 1, f"Expected 1 component, got {len(result)}"
    assert frozenset(result[0]) == frozenset(["A", "B", "C"])


def test_returns_each_node_as_own_component_when_no_edges():
    result = connected_components({"A": [], "B": [], "C": []}, ["A", "B", "C"])
    assert len(result) == 3
    for comp in result:
        assert len(comp) == 1


def test_handles_single_node_graph():
    result = connected_components({"A": []}, ["A"])
    assert len(result) == 1
    assert result[0] == ["A"]


def test_handles_linear_chain_as_single_component():
    adjacency_list = {
        "A": ["B"],
        "B": ["A", "C"],
        "C": ["B", "D"],
        "D": ["C"],
    }
    result = connected_components(adjacency_list, ["A", "B", "C", "D"])
    assert len(result) == 1
    assert frozenset(result[0]) == frozenset(["A", "B", "C", "D"])


def test_assigns_all_nodes_to_components_with_no_node_repeated():
    adjacency_list = {"A": ["B"], "B": ["A"], "C": ["D"], "D": ["C"], "E": []}
    node_ids = ["A", "B", "C", "D", "E"]
    result = connected_components(adjacency_list, node_ids)
    all_assigned = [node for comp in result for node in comp]
    assert len(all_assigned) == len(node_ids)
    assert set(all_assigned) == set(node_ids)


def test_correctly_identifies_3_component_graph_matching_default_input():
    adjacency_list = {
        "A": ["B"],
        "B": ["A", "C"],
        "C": ["B"],
        "D": ["E"],
        "E": ["D"],
        "F": ["G"],
        "G": ["F", "H"],
        "H": ["G"],
    }
    result = connected_components(adjacency_list, ["A", "B", "C", "D", "E", "F", "G", "H"])
    assert len(result) == 3
    component_sets = [frozenset(comp) for comp in result]
    assert frozenset(["A", "B", "C"]) in component_sets
    assert frozenset(["D", "E"]) in component_sets
    assert frozenset(["F", "G", "H"]) in component_sets


if __name__ == "__main__":
    test_finds_three_disconnected_components()
    test_returns_single_component_for_fully_connected_graph()
    test_returns_each_node_as_own_component_when_no_edges()
    test_handles_single_node_graph()
    test_handles_linear_chain_as_single_component()
    test_assigns_all_nodes_to_components_with_no_node_repeated()
    test_correctly_identifies_3_component_graph_matching_default_input()
    print("All tests passed!")
