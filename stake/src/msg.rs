use schemars::JsonSchema;
use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Addr;
use serde::{Deserialize, Serialize};

#[cw_serde]
pub struct InstantiateMsg {
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug, Default)]
pub struct Trait {
    pub display_type: Option<String>,
    pub trait_type: String,
    pub value: String,
}

// see: https://docs.opensea.io/docs/metadata-standards
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug, Default)]
pub struct Metadata {
    pub image: Option<String>,
    pub image_data: Option<String>,
    pub external_url: Option<String>,
    pub description: Option<String>,
    pub name: Option<String>,
    pub attributes: Option<Vec<Trait>>,
    pub background_color: Option<String>,
    pub animation_url: Option<String>,
    pub youtube_url: Option<String>,
}

#[cw_serde]
pub enum StakeExecuteMsg {
    Mint { token_id: String },
    SetNftAddress { nft_address: Addr },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    // GetCount returns the current count as a json-encoded number
    #[returns(GetStakedAmountResponse)]
    GetStakedAmount {},
    #[returns(GetStateResponse)]
    GetState {},
}

#[cw_serde]
pub struct GetStakedAmountResponse {
    pub amount: i32,
}

#[cw_serde]
pub struct GetStateResponse {
    pub nft_address: Option<Addr>,
    pub owner: Addr,
}
