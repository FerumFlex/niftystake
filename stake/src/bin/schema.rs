use cosmwasm_schema::write_api;

use stake::msg::{StakeExecuteMsg, InstantiateMsg, QueryMsg};

fn main() {
    write_api! {
        instantiate: InstantiateMsg,
        execute: StakeExecuteMsg,
        query: QueryMsg,
    }
}
