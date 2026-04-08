#include "../sources/DfsCycleDirected.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(DfsCycleDirected::dfsCycleDirected({{"A", {"B"}}, {"B", {"C"}}, {"C", {"A"}}}, {"A", "B", "C"}));
    assert(!DfsCycleDirected::dfsCycleDirected(
        {{"A", {"B", "C"}}, {"B", {"D"}}, {"C", {"D"}}, {"D", {}}}, {"A", "B", "C", "D"}));
    assert(DfsCycleDirected::dfsCycleDirected({{"A", {"A"}}, {"B", {}}}, {"A", "B"}));
    assert(!DfsCycleDirected::dfsCycleDirected({{"A", {}}}, {"A"}));
    assert(DfsCycleDirected::dfsCycleDirected(
        {{"A", {"B"}}, {"B", {"C"}}, {"C", {"D"}}, {"D", {"B"}}, {"E", {"A"}}},
        {"A", "B", "C", "D", "E"}));
    assert(!DfsCycleDirected::dfsCycleDirected(
        {{"A", {"B"}}, {"B", {"C"}}, {"C", {"D"}}, {"D", {}}}, {"A", "B", "C", "D"}));
    assert(!DfsCycleDirected::dfsCycleDirected(
        {{"A", {"B"}}, {"B", {}}, {"C", {"D"}}, {"D", {}}}, {"A", "B", "C", "D"}));
    assert(DfsCycleDirected::dfsCycleDirected(
        {{"A", {"B"}}, {"B", {}}, {"C", {"D"}}, {"D", {"C"}}}, {"A", "B", "C", "D"}));
    assert(!DfsCycleDirected::dfsCycleDirected(
        {{"A", {"B", "C"}}, {"B", {"D"}}, {"C", {"D"}}, {"D", {}}}, {"A", "B", "C", "D"}));
    cout << "All tests passed!" << endl;
    return 0;
}
