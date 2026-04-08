// g++ -o test CountBits_test.cpp && ./test
#define TESTING
#include "../sources/CountBits.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert((countBits(0) == std::vector<int>{0}));
    assert((countBits(2) == std::vector<int>{0, 1, 1}));
    assert((countBits(5) == std::vector<int>{0, 1, 1, 2, 1, 2}));

    std::vector<int> result15 = countBits(15);
    assert(result15.back() == 4);

    std::vector<int> result10 = countBits(10);
    assert(result10.size() == 11);

    std::vector<int> result16 = countBits(16);
    assert(result16[0] == 0);
    for (int power : {1, 2, 4, 8, 16}) {
        assert(result16[power] == 1);
    }
    assert(result16[7] == 3);
    assert(result16[15] == 4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
