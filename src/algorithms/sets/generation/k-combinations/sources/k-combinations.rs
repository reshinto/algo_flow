// K-Combinations — Backtracking Generation
// Generates all C(n,k) subsets of exactly k elements from the input array.
// Time: O(k × C(n,k)) — generate C(n,k) combinations, each of length k
// Space: O(k × C(n,k)) — store all combinations

fn backtrack(
    elements: &[i32],
    choose_k: usize,
    start_idx: usize,
    current_subset: &mut Vec<i32>,
    result: &mut Vec<Vec<i32>>,
) {
    if current_subset.len() == choose_k {
        result.push(current_subset.clone()); // @step:generate-subset
        return;
    }

    for elem_idx in start_idx..elements.len() {
        current_subset.push(elements[elem_idx]); // @step:initialize
        backtrack(elements, choose_k, elem_idx + 1, current_subset, result);
        current_subset.pop(); // @step:backtrack
    }
}

fn k_combinations(elements: &[i32], choose_k: usize) -> Vec<Vec<i32>> {
    let mut result: Vec<Vec<i32>> = Vec::new(); // @step:initialize
    let mut current_subset: Vec<i32> = Vec::new(); // @step:initialize

    backtrack(elements, choose_k, 0, &mut current_subset, &mut result); // @step:initialize
    result // @step:complete
}

fn main() {
    let elements = vec![1, 2, 3, 4, 5];
    let result = k_combinations(&elements, 3);
    println!("{:?}", result);
}
