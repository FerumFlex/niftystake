build:
	archway build

state:
	archway query contract-state smart --args '{"get_state": {}}'

deploy:
	archway deploy --from main --label stake --args '{}'

set_address:
	archway tx --no-confirm  --from main --args '{"set_nft_address": {"nft_address": "archway1usnr9cv4x9q4c5su9nz5kmy9qfs8yxjllv0llwf6tjzzx90rpd9sf0xcf7"}}'

mint:
	archway tx --no-confirm  --from main --args '{"mint": {}}'
