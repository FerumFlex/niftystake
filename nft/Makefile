build:
	archway build

deploy:
	archway deploy --from main --label nft --args '{"minter": "archway1h4h08q8j7g4punc2zrvvmfuqe05mn85jss2pfy09yqcwa64rgw4q4r3a88", "name": "NiFTyStake", "symbol": "nftSTK"}'

num_tokens:
	archway query contract-state smart --args '{"num_tokens": {}}'

token_info:
	archway query contract-state smart --args '{"nft_info": {"token_id": "123"}}'

all_nft_info:
	archway query contract-state smart --args '{"all_nft_info": {"token_id": "123"}}'

tokens:
	archway query contract-state smart --args '{"tokens": {"owner": "archway13lv65pvdv00t570tvgdwwe8ev6jhuvpf3myq5m"}}'
