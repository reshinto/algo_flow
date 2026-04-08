// g++ -o MinRemoveToMakeValid_test MinRemoveToMakeValid_test.cpp && ./MinRemoveToMakeValid_test
#define TESTING
#include "sources/MinRemoveToMakeValid.cpp"
#include <cassert>
#include <iostream>
#include <string>

int main() {
    assert(minRemoveToMakeValid("(ab)") == "(ab)");
    assert(minRemoveToMakeValid("a(b(c)d") == "ab(c)d");
    assert(minRemoveToMakeValid("a)b") == "ab");
    assert(minRemoveToMakeValid("))ab") == "ab");
    assert(minRemoveToMakeValid("ab((") == "ab");
    assert(minRemoveToMakeValid("lee(t(c)o)de)") == "lee(t(c)o)de");
    assert(minRemoveToMakeValid(")))") == "");
    assert(minRemoveToMakeValid("") == "");
    assert(minRemoveToMakeValid("abcdef") == "abcdef");
    assert(minRemoveToMakeValid("((()))") == "((()))");
    assert(minRemoveToMakeValid(")a(b(c)d(") == "ab(c)d");

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
