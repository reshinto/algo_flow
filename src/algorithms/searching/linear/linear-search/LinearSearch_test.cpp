#include "sources/LinearSearch.cpp"
#include <cassert>
#include <vector>

int main() {
    std::vector<int> standardArray = {4, 2, 7, 1, 9, 3, 8, 5};

    assert(linearSearch(standardArray, 9) == 4);
    assert(linearSearch(standardArray, 6) == -1);
    assert(linearSearch({}, 5) == -1);
    assert(linearSearch({42}, 42) == 0);
    assert(linearSearch({42}, 10) == -1);
    assert(linearSearch(standardArray, 4) == 0);
    assert(linearSearch(standardArray, 5) == 7);
    assert(linearSearch({3, 1, 3, 5, 3}, 3) == 0);
    assert(linearSearch({-5, -3, 0, 2, 4}, -3) == 1);
    assert(linearSearch({9, 3, 1, 7, 2, 5}, 7) == 3);

    return 0;
}
