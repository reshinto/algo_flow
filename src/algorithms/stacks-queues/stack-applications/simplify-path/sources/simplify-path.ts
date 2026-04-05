// Simplify Path — use a stack to resolve Unix path components into a canonical path
function simplifyPath(inputString: string): string {
  const dirStack: string[] = []; // @step:initialize
  const components = inputString.split("/"); // @step:initialize
  for (let partIdx = 0; partIdx < components.length; partIdx++) {
    const component = components[partIdx]!; // @step:visit
    if (component === "" || component === ".") {
      // Skip empty segments and current-directory markers
      continue; // @step:visit
    } else if (component === "..") {
      // Parent-directory marker — pop top of stack if non-empty
      if (dirStack.length > 0) {
        dirStack.pop(); // @step:pop
      }
    } else {
      // Valid directory name — push onto stack
      dirStack.push(component); // @step:push
    }
  }
  // Join accumulated directories with leading slash
  return "/" + dirStack.join("/"); // @step:complete
}
