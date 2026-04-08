// Simplify Path — use a stack to resolve Unix path components into a canonical path
#include <iostream>
#include <sstream>
#include <string>
#include <vector>

std::string simplifyPath(const std::string& inputString) {
    std::vector<std::string> dirStack; // @step:initialize
    std::vector<std::string> components;
    std::stringstream streamInput(inputString);
    std::string token;
    while (std::getline(streamInput, token, '/')) {
        components.push_back(token);
    } // @step:initialize

    for (std::size_t partIdx = 0; partIdx < components.size(); partIdx++) {
        const std::string& component = components[partIdx]; // @step:visit
        if (component.empty() || component == ".") {
            // Skip empty segments and current-directory markers
            continue; // @step:visit
        } else if (component == "..") {
            // Parent-directory marker — pop top of stack if non-empty
            if (!dirStack.empty()) {
                dirStack.pop_back(); // @step:pop
            }
        } else {
            // Valid directory name — push onto stack
            dirStack.push_back(component); // @step:push
        }
    }

    // Join accumulated directories with leading slash
    std::string result = "/";
    for (std::size_t idx = 0; idx < dirStack.size(); idx++) {
        if (idx > 0) result += "/";
        result += dirStack[idx];
    }
    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::cout << simplifyPath("/home/../usr/./bin/") << std::endl;
    return 0;
}
#endif
