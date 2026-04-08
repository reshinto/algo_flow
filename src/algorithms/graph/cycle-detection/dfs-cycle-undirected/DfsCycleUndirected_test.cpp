#include "sources/DfsCycleUndirected.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(DfsCycleUndirected::dfsCycleUndirected(
        {{"A", {"B", "C"}}, {"B", {"A", "C"}}, {"C", {"B", "A"}}}, {"A", "B", "C"}));
    assert(!DfsCycleUndirected::dfsCycleUndirected(
        {{"A", {"B", "C"}}, {"B", {"A", "D"}}, {"C", {"A"}}, {"D", {"B"}}},
        {"A", "B", "C", "D"}));
    assert(!DfsCycleUndirected::dfsCycleUndirected({{"A", {}}}, {"A"}));
    assert(!DfsCycleUndirected::dfsCycleUndirected({{"A", {}}, {"B", {}}}, {"A", "B"}));
    assert(DfsCycleUndirected::dfsCycleUndirected(
        {{"A", {"B", "D"}}, {"B", {"A", "C"}}, {"C", {"B", "D"}},
         {"D", {"C", "A", "E"}}, {"E", {"D"}}},
        {"A", "B", "C", "D", "E"}));
    assert(!DfsCycleUndirected::dfsCycleUndirected(
        {{"A", {"B"}}, {"B", {"A", "C"}}, {"C", {"B", "D"}}, {"D", {"C"}}},
        {"A", "B", "C", "D"}));
    assert(DfsCycleUndirected::dfsCycleUndirected(
        {{"A", {"B"}}, {"B", {"A"}},
         {"C", {"D", "E"}}, {"D", {"C", "E"}}, {"E", {"C", "D"}}},
        {"A", "B", "C", "D", "E"}));
    assert(!DfsCycleUndirected::dfsCycleUndirected(
        {{"A", {"B"}}, {"B", {"A"}}}, {"A", "B"}));
    cout << "All tests passed!" << endl;
    return 0;
}
