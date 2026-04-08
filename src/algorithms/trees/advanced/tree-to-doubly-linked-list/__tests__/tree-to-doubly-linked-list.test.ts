import { describe, it, expect } from "vitest";
import { treeToDoublyLinkedList } from "../sources/tree-to-doubly-linked-list.ts?fn";

interface DLLNode {
  value: number;
  left: DLLNode | null;
  right: DLLNode | null;
}
function node(value: number, left: DLLNode | null = null, right: DLLNode | null = null): DLLNode {
  return { value, left, right };
}

describe("treeToDoublyLinkedList", () => {
  it("returns null for null input", () => {
    expect(treeToDoublyLinkedList(null)).toBeNull();
  });

  it("handles single node", () => {
    const root = node(5);
    const head = treeToDoublyLinkedList(root) as DLLNode;
    expect(head.value).toBe(5);
    expect(head.right).toBe(head); // circular
    expect(head.left).toBe(head);
  });

  it("produces sorted DLL from a 3-node BST", () => {
    const root = node(2, node(1), node(3));
    const head = treeToDoublyLinkedList(root) as DLLNode;
    expect(head.value).toBe(1);
    expect(head.right?.value).toBe(2);
    expect(head.right?.right?.value).toBe(3);
    // Circular: tail.right === head
    expect(head.right?.right?.right).toBe(head);
  });

  it("produces sorted DLL from 7-node BST", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    const head = treeToDoublyLinkedList(root) as DLLNode;
    const values: number[] = [];
    let current: DLLNode = head;
    for (let step = 0; step < 7; step++) {
      values.push(current.value);
      current = current.right!;
    }
    expect(values).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
