// Union-Find (Disjoint Set Union) — Path Compression + Union by Rank
// Maintains a partition of elements into disjoint sets.
// find(x): returns the root representative of x's set, compressing the path.
// union(x, y): merges the sets containing x and y using rank heuristic.
// Time: O(α(n)) amortized per operation — Space: O(n)

use std::collections::HashMap;

fn find(parent: &mut Vec<usize>, element: usize) -> usize {
    // @step:find-root
    if parent[element] != element {
        parent[element] = find(parent, parent[element]); // @step:find-root
    }
    parent[element]
}

fn union_sets(parent: &mut Vec<usize>, rank: &mut Vec<u32>, elem_a: usize, elem_b: usize) {
    let root_a = find(parent, elem_a); // @step:find-root
    let root_b = find(parent, elem_b); // @step:find-root
    if root_a == root_b {
        return;
    }

    if rank[root_a] >= rank[root_b] {
        parent[root_b] = root_a; // @step:union-sets
        if rank[root_a] == rank[root_b] {
            rank[root_a] += 1;
        }
    } else {
        parent[root_a] = root_b; // @step:union-sets
    }
}

fn union_find(element_count: usize, operations: &[(usize, usize)]) -> Vec<Vec<usize>> {
    let mut parent: Vec<usize> = (0..element_count).collect(); // @step:initialize
    let mut rank: Vec<u32> = vec![0; element_count]; // @step:initialize

    for &(elem_a, elem_b) in operations {
        union_sets(&mut parent, &mut rank, elem_a, elem_b);
    }

    // Build final components
    let mut component_map: HashMap<usize, Vec<usize>> = HashMap::new();
    for elem_idx in 0..element_count {
        let root = find(&mut parent, elem_idx);
        component_map.entry(root).or_default().push(elem_idx);
    }

    let components: Vec<Vec<usize>> = component_map.into_values().collect(); // @step:complete
    components
}

fn main() {
    let operations = vec![(0, 1), (2, 3), (4, 5), (6, 7), (0, 2), (4, 6), (0, 4)];
    let components = union_find(8, &operations);
    println!("{:?}", components);
}
