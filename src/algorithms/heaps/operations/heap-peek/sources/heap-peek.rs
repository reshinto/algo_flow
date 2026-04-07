// Heap Peek — return the minimum element (root) from a min-heap without removing it
fn heap_peek(heap_array: &[i64]) -> Option<i64> {
    let array = heap_array.to_vec(); // @step:initialize
    // The root at index 0 is always the minimum in a valid min-heap
    let minimum_value = array.first().copied(); // @step:visit
    minimum_value // @step:complete
}
