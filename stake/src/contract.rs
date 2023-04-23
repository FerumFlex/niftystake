#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::wasm_execute;
use cosmwasm_std::{to_binary, Binary, SubMsg, Deps, DepsMut, Env, MessageInfo, StdResult, Response};
use cosmwasm_std::{WasmMsg};
use cw2::set_contract_version;
use cosmwasm_std::Addr;
pub use cw721_base::{MintMsg, MinterResponse, ExecuteMsg};

use crate::error::ContractError;
use crate::msg::{StakeExecuteMsg, Metadata, GetStakedAmountResponse, InstantiateMsg, QueryMsg, GetStateResponse};
use crate::state::{State, STATE};

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:stake";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let state = State {
        nft_address: None,
        owner: info.sender.clone(),
    };
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
    STATE.save(deps.storage, &state)?;

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("owner", info.sender))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: StakeExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        StakeExecuteMsg::Mint { token_id } => execute::mint(deps, info, env, token_id),
        StakeExecuteMsg::SetNftAddress { nft_address } => execute::set_nft_address(deps, nft_address),
    }
}

pub mod execute {
    use super::*;

    pub fn mint(deps: DepsMut, info: MessageInfo, env: Env, token_id: String) -> Result<Response, ContractError> {
        let state = STATE.load(deps.storage)?;

        let metadata = Metadata {
            image: None,
            image_data: None,
            external_url: None,
            description: Some(String::from("NiFTyStake #")),
            name: Some(token_id.clone()),
            attributes: None,
            background_color: None,
            animation_url: None,
            youtube_url: None,
        };
        let mint_msg = MintMsg {
            token_id: token_id.clone(),
            owner: info.sender.to_string(),
            token_uri: Some(String::from("https://image.niftystake.tronql.com/")),
            extension: metadata.clone(),
        };
        let exec_msg = ExecuteMsg::Mint(mint_msg.clone());

        let message = SubMsg::new(WasmMsg::Execute {
            contract_addr: state.nft_address.ok_or(ContractError::EmptyNftMinter {})?.to_string(),
            msg: to_binary(&exec_msg)?,
            funds: vec![],
        });

        Ok(Response::new()
            .add_submessage(message)
            .add_attribute("action", "mint"))
    }

    pub fn set_nft_address(deps: DepsMut, nft_address: Addr) -> Result<Response, ContractError> {
        let mut state = STATE.load(deps.storage)?;

        state.nft_address = Some(nft_address);
        STATE.save(deps.storage, &state)?;

        Ok(Response::new().add_attribute("action", "SetNftAddress"))
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetStakedAmount {} => to_binary(&query::get_staked_amount(deps)?),
        QueryMsg::GetState {} => to_binary(&query::get_state(deps)?),
    }
}

pub mod query {
    use super::*;

    pub fn get_staked_amount(deps: Deps) -> StdResult<GetStakedAmountResponse> {
        Ok(GetStakedAmountResponse { amount: 10 })
    }

    pub fn get_state(deps: Deps) -> StdResult<GetStateResponse> {
        let state = STATE.load(deps.storage)?;
        Ok(GetStateResponse { nft_address: state.nft_address, owner: state.owner })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coins, from_binary};
}
