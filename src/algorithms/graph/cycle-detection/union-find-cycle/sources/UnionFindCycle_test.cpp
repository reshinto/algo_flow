#include "UnionFindCycle.cpp"
#include <cassert>
#include <iostream>

EdgePair edge(const string& source, const string& target) {
    return {source, target};
}

int main() {
    assert(UnionFindCycle::unionFindCycle({edge("A","B"), edge("B","C"), edge("C","A")}, {"A","B","C"}));
    assert(!UnionFindCycle::unionFindCycle({edge("A","B"), edge("A","C"), edge("B","D")}, {"A","B","C","D"}));
    assert(!UnionFindCycle::unionFindCycle({}, {"A","B","C"}));
    assert(!UnionFindCycle::unionFindCycle({}, {"A"}));
    assert(UnionFindCycle::unionFindCycle(
        {edge("A","B"), edge("B","C"), edge("C","D"), edge("D","A"), edge("D","E")},
        {"A","B","C","D","E"}));
    assert(!UnionFindCycle::unionFindCycle(
        {edge("A","B"), edge("B","C"), edge("C","D")}, {"A","B","C","D"}));
    assert(UnionFindCycle::unionFindCycle(
        {edge("A","B"), edge("B","C"), edge("C","D"), edge("D","E"), edge("E","A")},
        {"A","B","C","D","E"}));
    assert(!UnionFindCycle::unionFindCycle(
        {edge("A","B"), edge("A","C"), edge("A","D"), edge("A","E")},
        {"A","B","C","D","E"}));
    assert(UnionFindCycle::unionFindCycle(
        {edge("A","B"), edge("C","D"), edge("D","E"), edge("E","C")},
        {"A","B","C","D","E"}));
    cout << "All tests passed!" << endl;
    return 0;
}
