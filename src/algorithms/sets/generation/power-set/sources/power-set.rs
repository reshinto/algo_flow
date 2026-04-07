// Power Set — Backtracking Generation
// Generates all 2^n subsets of the input elements by choosing to include or exclude each element.
// Time: O(n × 2^n) — generate 2^n subsets, each of length up to n
// Space: O(n × 2^n) — store all subsets

fn backtrack(elements: &[i32], start_idx: usize, current_subset: &mut Vec<i32>, result: &mut Vec<Vec<i32>>) {
    result.push(current_subset.clone()); // @step:generate-subset

    for elem_idx in start_idx..elements.len() {
        current_subset.push(elements[elem_idx]); // @step:initialize
        backtrack(elements, elem_idx + 1, current_subset, result); // recurse with next element
        current_subset.pop(); // @step:backtrack
    }
}

fn power_set(elements: &[i32]) -> Vec<Vec<i32>> {
    let mut result: Vec<Vec<i32>> = Vec::new(); // @step:initialize
    let mut current_subset: Vec<i32> = Vec::new(); // @step:initialize

    backtrack(elements, 0, &mut current_subset, &mut result); // @step:initialize
    result // @step:complete
}

fn main() {
    let elements = vec![1, 2, 3];
    let result = power_set(&elements);
    println!("{:?}", result);
}
