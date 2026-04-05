// Flatten Nested List Iterator — use a stack to peel nested lists layer by layer
type NestedItem = number | NestedItem[];

function flattenNestedListIterator(nestedList: NestedItem[]): number[] {
  const stack: NestedItem[] = [...nestedList].reverse(); // @step:initialize
  const result: number[] = []; // @step:initialize
  while (stack.length > 0) {
    const top = stack.pop()!; // @step:pop
    if (typeof top === "number") {
      result.push(top); // @step:visit
    } else {
      for (let itemIdx = top.length - 1; itemIdx >= 0; itemIdx--) {
        stack.push(top[itemIdx]!); // @step:push
      }
    }
  }
  return result; // @step:complete
}
