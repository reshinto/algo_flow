import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("tarjan-scc")
tarjan_scc = module.tarjan_scc


def test_finds_three_sccs_in_default_8_node_graph():
    adjacency_list = {
        "A": ["B"], "B": ["C"], "C": ["A", "D"],
        "D": ["E"], "E": ["D", "F"], "F": ["G"],
        "G": ["H"], "H": ["F"],
    }
    node_ids = ["A", "B", "C", "D", "E", "F", "G", "H"]
    result = tarjan_scc(adjacency_list, node_ids)
    assert len(result) == 3
    comp_sets = [frozenset(comp) for comp in result]
    assert frozenset(["A", "B", "C"]) in comp_sets
    assert frozenset(["D", "E"]) in comp_sets
    assert frozenset(["F", "G", "H"]) in comp_sets


def test_finds_single_scc_for_fully_cyclic_graph():
    adjacency_list = {"A": ["B"], "B": ["C"], "C": ["A"]}
    result = tarjan_scc(adjacency_list, ["A", "B", "C"])
    assert len(result) == 1
    assert frozenset(result[0]) == frozenset(["A", "B", "C"])


def test_returns_each_node_as_own_scc_for_dag():
    adjacency_list = {"A": ["B"], "B": ["C"], "C": []}
    result = tarjan_scc(adjacency_list, ["A", "B", "C"])
    assert len(result) == 3
    for comp in result:
        assert len(comp) == 1


def test_handles_single_node_with_no_edges():
    result = tarjan_scc({"A": []}, ["A"])
    assert len(result) == 1
    assert result[0] == ["A"]


def test_handles_disconnected_directed_graph():
    adjacency_list = {"A": ["B"], "B": ["A"], "C": ["D"], "D": ["C"]}
    result = tarjan_scc(adjacency_list, ["A", "B", "C", "D"])
    assert len(result) == 2
    comp_sets = [frozenset(comp) for comp in result]
    assert frozenset(["A", "B"]) in comp_sets
    assert frozenset(["C", "D"]) in comp_sets


def test_assigns_every_node_to_exactly_one_scc():
    adjacency_list = {
        "A": ["B"], "B": ["C"], "C": ["A", "D"], "D": ["E"], "E": ["D"],
    }
    node_ids = ["A", "B", "C", "D", "E"]
    result = tarjan_scc(adjacency_list, node_ids)
    all_nodes = [node for comp in result for node in comp]
    assert len(all_nodes) == len(node_ids)
    assert set(all_nodes) == set(node_ids)


def test_correctly_handles_self_loops_as_single_node_sccs():
    adjacency_list = {"A": ["A"], "B": []}
    result = tarjan_scc(adjacency_list, ["A", "B"])
    assert len(result) == 2
    comp_sets = [frozenset(comp) for comp in result]
    assert frozenset(["A"]) in comp_sets
    assert frozenset(["B"]) in comp_sets


if __name__ == "__main__":
    test_finds_three_sccs_in_default_8_node_graph()
    test_finds_single_scc_for_fully_cyclic_graph()
    test_returns_each_node_as_own_scc_for_dag()
    test_handles_single_node_with_no_edges()
    test_handles_disconnected_directed_graph()
    test_assigns_every_node_to_exactly_one_scc()
    test_correctly_handles_self_loops_as_single_node_sccs()
    print("All tests passed!")
