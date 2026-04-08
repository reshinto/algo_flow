// g++ -o GenerateBinaryNumbers_test GenerateBinaryNumbers_test.cpp && ./GenerateBinaryNumbers_test
#define TESTING
#include "../sources/GenerateBinaryNumbers.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>

int main() {
    assert((generateBinaryNumbers(5) == std::vector<std::string>{"1", "10", "11", "100", "101"}));
    assert((generateBinaryNumbers(1) == std::vector<std::string>{"1"}));
    assert((generateBinaryNumbers(3) == std::vector<std::string>{"1", "10", "11"}));
    assert((generateBinaryNumbers(10) == std::vector<std::string>{"1", "10", "11", "100", "101", "110", "111", "1000", "1001", "1010"}));
    assert((generateBinaryNumbers(0) == std::vector<std::string>{}));

    auto result15 = generateBinaryNumbers(15);
    assert(result15.size() == 15);

    auto result4 = generateBinaryNumbers(4);
    assert(result4.back() == "100");

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
