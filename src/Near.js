import {readable,writable,get} from 'svelte/store';

export const near=writable(null);
export const nearWallet=writable(null);
export const contract=writable(null);
export const balance=writable(0);
contract.subscribe(async (v) => {if (v){
    balance.set(await getBalance());
}});

export async function getBalance(){
    let b=Number(await get(contract).get_balance({owner:get(nearWallet).getAccountId()}));
    return b;
}

export async function getCharacter(token){
    let res = await get(contract).get_character({token});
    res = JSON.parse(res);
    return {...res,token};
}

