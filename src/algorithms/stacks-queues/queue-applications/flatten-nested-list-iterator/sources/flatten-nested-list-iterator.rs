// Flatten Nested List Iterator — use a stack to peel nested lists layer by layer
#[derive(Clone)]
enum NestedItem {
    Value(i32),
    List(Vec<NestedItem>),
}

fn flatten_nested_list_iterator(nested_list: Vec<NestedItem>) -> Vec<i32> {
    let mut stack: Vec<NestedItem> = nested_list.into_iter().rev().collect(); // @step:initialize
    let mut result: Vec<i32> = Vec::new(); // @step:initialize
    while let Some(top) = stack.pop() {
        // @step:pop
        match top {
            NestedItem::Value(val) => {
                result.push(val); // @step:visit
            }
            NestedItem::List(items) => {
                for item in items.into_iter().rev() {
                    stack.push(item); // @step:push
                }
            }
        }
    }
    result // @step:complete
}

fn main() {
    let nested = vec![
        NestedItem::List(vec![NestedItem::Value(1), NestedItem::Value(1)]),
        NestedItem::Value(2),
        NestedItem::List(vec![NestedItem::Value(1), NestedItem::Value(1)]),
    ];
    println!("{:?}", flatten_nested_list_iterator(nested));
}
