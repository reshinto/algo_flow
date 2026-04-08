// g++ -o SimplifyPath_test SimplifyPath_test.cpp && ./SimplifyPath_test
#define TESTING
#include "sources/SimplifyPath.cpp"
#include <cassert>
#include <iostream>
#include <string>

int main() {
    assert(simplifyPath("/a/./b/../../c/") == "/c");
    assert(simplifyPath("/home/") == "/home");
    assert(simplifyPath("/../") == "/");
    assert(simplifyPath("/home//foo/") == "/home/foo");
    assert(simplifyPath("/") == "/");
    assert(simplifyPath("/a/b/c/d") == "/a/b/c/d");
    assert(simplifyPath("/a/b/../../c/d/../e") == "/c/e");
    assert(simplifyPath("/..") == "/");
    assert(simplifyPath("/./././.") == "/");

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
