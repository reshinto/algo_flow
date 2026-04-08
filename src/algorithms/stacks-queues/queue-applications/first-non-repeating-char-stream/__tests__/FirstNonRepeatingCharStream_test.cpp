// g++ -o FirstNonRepeatingCharStream_test FirstNonRepeatingCharStream_test.cpp && ./FirstNonRepeatingCharStream_test
#define TESTING
#include "../sources/FirstNonRepeatingCharStream.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>

int main() {
    assert((firstNonRepeatingCharStream("aabcbcd") == std::vector<std::string>{"a", "#", "b", "b", "c", "#", "d"}));
    assert((firstNonRepeatingCharStream("z") == std::vector<std::string>{"z"}));
    assert((firstNonRepeatingCharStream("aabb") == std::vector<std::string>{"a", "#", "b", "#"}));
    assert((firstNonRepeatingCharStream("abcd") == std::vector<std::string>{"a", "a", "a", "a"}));
    assert((firstNonRepeatingCharStream("aa") == std::vector<std::string>{"a", "#"}));
    assert((firstNonRepeatingCharStream("aba") == std::vector<std::string>{"a", "a", "b"}));
    assert((firstNonRepeatingCharStream("") == std::vector<std::string>{}));

    auto longResult = firstNonRepeatingCharStream("aaaabc");
    assert(longResult[0] == "a");
    assert(longResult[1] == "#");
    assert(longResult[2] == "#");
    assert(longResult[3] == "#");
    assert(longResult[4] == "b");
    assert(longResult[5] == "b");

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
