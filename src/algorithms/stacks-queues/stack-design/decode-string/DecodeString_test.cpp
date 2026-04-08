// g++ -o DecodeString_test DecodeString_test.cpp && ./DecodeString_test
#define TESTING
#include "sources/DecodeString.cpp"
#include <cassert>
#include <iostream>
#include <string>

int main() {
    assert(decodeString("3[a]") == "aaa");
    assert(decodeString("3[a2[c]]") == "accaccacc");
    assert(decodeString("2[abc]3[cd]ef") == "abcabccdcdcdef");
    assert(decodeString("abc") == "abc");
    assert(decodeString("5[z]") == "zzzzz");
    assert(decodeString("2[2[a]]") == "aaaa");
    assert(decodeString("") == "");
    assert(decodeString("10[a]") == "aaaaaaaaaa");
    assert(decodeString("a2[b]c") == "abbc");

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
