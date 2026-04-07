// Simplify Path — use a stack to resolve Unix path components into a canonical path
package main

import (
	"fmt"
	"strings"
)

func simplifyPath(inputString string) string {
	dirStack := []string{} // @step:initialize
	components := strings.Split(inputString, "/") // @step:initialize
	for partIdx := 0; partIdx < len(components); partIdx++ {
		component := components[partIdx] // @step:visit
		if component == "" || component == "." {
			// Skip empty segments and current-directory markers
			continue // @step:visit
		} else if component == ".." {
			// Parent-directory marker — pop top of stack if non-empty
			if len(dirStack) > 0 {
				dirStack = dirStack[:len(dirStack)-1] // @step:pop
			}
		} else {
			// Valid directory name — push onto stack
			dirStack = append(dirStack, component) // @step:push
		}
	}
	// Join accumulated directories with leading slash
	return "/" + strings.Join(dirStack, "/") // @step:complete
}

func main() {
	fmt.Println(simplifyPath("/home/../usr/./bin/"))
}
