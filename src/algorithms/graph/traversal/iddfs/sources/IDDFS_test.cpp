#include "IDDFS.cpp"
#include <cassert>
#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

unordered_map<string, vector<string>> makeAdj(
    initializer_list<pair<string, vector<string>>> pairs
) {
    unordered_map<string, vector<string>> adj;
    for (const auto& pair : pairs) {
        adj[pair.first] = pair.second;
    }
    return adj;
}

void testTraversesLinearGraphInDepthFirstOrder() {
    auto adj = makeAdj({{"A", {"B"}}, {"B", {"C"}}, {"C", {"D"}}, {"D", {}}});
    auto result = IDDFS::iterativeDeepeningDFS(adj, "A");
    assert(result == (vector<string>{"A", "B", "C", "D"}));
}

void testTraversesTreeGraphVisitingChildrenBeforeSiblings() {
    auto adj = makeAdj({
        {"A", {"B", "C"}}, {"B", {"D", "E"}}, {"C", {"F"}},
        {"D", {}}, {"E", {}}, {"F", {}}
    });
    auto result = IDDFS::iterativeDeepeningDFS(adj, "A");
    assert(result.size() == 6);
    assert(result[0] == "A");
    unordered_set<string> resultSet(result.begin(), result.end());
    unordered_set<string> expected{"A", "B", "C", "D", "E", "F"};
    assert(resultSet == expected);
}

void testHandlesDisconnectedGraphVisitingOnlyReachableNodes() {
    auto adj = makeAdj({{"A", {"B"}}, {"B", {}}, {"C", {"D"}}, {"D", {}}});
    auto result = IDDFS::iterativeDeepeningDFS(adj, "A");
    unordered_set<string> resultSet(result.begin(), result.end());
    assert(resultSet.count("A"));
    assert(resultSet.count("B"));
    assert(!resultSet.count("C"));
    assert(!resultSet.count("D"));
}

void testHandlesSingleNodeGraph() {
    auto adj = makeAdj({{"A", {}}});
    auto result = IDDFS::iterativeDeepeningDFS(adj, "A");
    assert(result == (vector<string>{"A"}));
}

void testDoesNotVisitSameNodeTwiceInCyclicGraph() {
    auto adj = makeAdj({{"A", {"B"}}, {"B", {"C"}}, {"C", {"A"}}});
    auto result = IDDFS::iterativeDeepeningDFS(adj, "A");
    assert(result == (vector<string>{"A", "B", "C"}));
    assert(result.size() == 3);
}

void testRespectsExplicitMaxDepth() {
    auto adj = makeAdj({
        {"A", {"B", "C"}}, {"B", {"D"}}, {"C", {"E"}},
        {"D", {"F"}}, {"E", {}}, {"F", {}}
    });
    auto result = IDDFS::iterativeDeepeningDFS(adj, "A", 1);
    unordered_set<string> resultSet(result.begin(), result.end());
    assert(resultSet.count("A"));
    assert(resultSet.count("B"));
    assert(resultSet.count("C"));
    assert(!resultSet.count("D"));
    assert(!resultSet.count("F"));
}

void testVisitsNeighborsInOrderTheyAppearInAdjacencyList() {
    auto adj = makeAdj({{"A", {"B", "C"}}, {"B", {}}, {"C", {}}});
    auto result = IDDFS::iterativeDeepeningDFS(adj, "A");
    assert(result[0] == "A");
    unordered_set<string> resultSet(result.begin(), result.end());
    unordered_set<string> expected{"A", "B", "C"};
    assert(resultSet == expected);
}

void testTraversesFullyConnectedGraphVisitingAllNodes() {
    auto adj = makeAdj({
        {"A", {"B", "C", "D"}}, {"B", {"A", "C", "D"}},
        {"C", {"A", "B", "D"}}, {"D", {"A", "B", "C"}}
    });
    auto result = IDDFS::iterativeDeepeningDFS(adj, "A");
    assert(result.size() == 4);
    assert(result[0] == "A");
    unordered_set<string> resultSet(result.begin(), result.end());
    unordered_set<string> expected{"A", "B", "C", "D"};
    assert(resultSet == expected);
}

int main() {
    testTraversesLinearGraphInDepthFirstOrder();
    testTraversesTreeGraphVisitingChildrenBeforeSiblings();
    testHandlesDisconnectedGraphVisitingOnlyReachableNodes();
    testHandlesSingleNodeGraph();
    testDoesNotVisitSameNodeTwiceInCyclicGraph();
    testRespectsExplicitMaxDepth();
    testVisitsNeighborsInOrderTheyAppearInAdjacencyList();
    testTraversesFullyConnectedGraphVisitingAllNodes();
    cout << "All tests passed!" << endl;
    return 0;
}
