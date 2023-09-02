use candid::{CandidType, Decode, Deserialize, Encode};
use ic_cdk::{query, update};
use ic_stable_structures::{
    memory_manager::{MemoryId, MemoryManager, VirtualMemory},
    BoundedStorable, DefaultMemoryImpl, StableBTreeMap, Storable,
};
use std::{borrow::Cow, cell::RefCell, collections::HashMap};

type Memory = VirtualMemory<DefaultMemoryImpl>;

const MAX_VALUE_SIZE: u32 = 100;

#[derive(Deserialize, CandidType)]
struct TodoItem {
    assignee: String,
    description: String,
    duration: u32,
    is_active: bool,
    updated_at: String,
}

impl Storable for TodoItem {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for TodoItem {
    const MAX_SIZE: u32 = MAX_VALUE_SIZE;
    const IS_FIXED_SIZE: bool = false;
}

thread_local! {
static MEMORY_MANAGER : RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

static TODO_MAP: RefCell<StableBTreeMap<u64, TodoItem, Memory>> = RefCell::new(StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))));
}

#[query(name = "fetch_all")]
fn get_todo_list_map() -> Option<HashMap<u64, TodoItem>> {
    // let mut vector: Vec<TodoItem> = Vec::new();
    let mut map: HashMap<u64, TodoItem> = HashMap::new();

    TODO_MAP.with(|p| {
        for (k, v) in p.borrow().iter() {
            // vector.push(v);
            map.insert(k, v);
        }
    });
    return Some(map);
}

#[update(name = "get")]
fn get_todo(key: u64) -> Option<TodoItem> {
    TODO_MAP.with(|p| p.borrow_mut().get(&key))
}

#[update(name = "create")]
fn insert_new_todo(key: u64, value: TodoItem) -> Option<TodoItem> {
    TODO_MAP.with(|p| {
        let mut borrowed_map = p.borrow_mut();
        if borrowed_map.contains_key(&key) {
            return None;
        }
        borrowed_map.insert(key, value)
    })
}

#[update(name = "update")]
fn update_todo(key: u64, value: TodoItem) -> Option<TodoItem> {
    TODO_MAP.with(|p| p.borrow_mut().insert(key, value))
}

#[update(name = "delete")]
fn delete_todo(key: u64) -> Option<TodoItem> {
    TODO_MAP.with(|p| p.borrow_mut().remove(&key))
}
