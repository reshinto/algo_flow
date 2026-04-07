// Set Permutations
// Generates all n! orderings of a set using backtracking with in-place swaps.
// Time: O(n × n!) — n! permutations each of length n
// Space: O(n × n!) for the result, O(n) call stack depth

fn permute(working: &mut Vec<i32>, start_idx: usize, result: &mut Vec<Vec<i32>>) {
    if start_idx == working.len() {
        result.push(working.clone()); // @step:generate-permutation
        return;
    }

    for swap_idx in start_idx..working.len() {
        // Swap elements[start_idx] with elements[swap_idx]
        working.swap(start_idx, swap_idx); // @step:backtrack
        permute(working, start_idx + 1, result);
        // Restore original order
        working.swap(start_idx, swap_idx); // @step:backtrack
    }
}

fn set_permutations(elements: &[i32]) -> Vec<Vec<i32>> {
    let mut result: Vec<Vec<i32>> = Vec::new(); // @step:initialize
    let mut working = elements.to_vec();         // @step:initialize

    permute(&mut working, 0, &mut result);
    result // @step:complete
}

fn main() {
    let elements = vec![1, 2, 3];
    let result = set_permutations(&elements);
    println!("{:?}", result);
}
