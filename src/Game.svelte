<script>
import {near,nearWallet,contract,getCharacter,balance,getBalance} from './Near.js';
import Card from './Card.svelte';
import Button from './Button.svelte';
let cards = [];

$: if ($contract){
    showMyCards();
}
async function showMyCards(){
    let res = await $contract.get_characters_by_owner({owner: $nearWallet.getAccountId()});
    cards = JSON.parse(res);
}

async function createCharacter(){
    await $contract.create_random_character({});
    await showMyCards();
    balance.set(await getBalance());
}

async function updateCharacter(event){
    cards = cards;
}
const loadingData = {name : 'loading...',attack:0,defense:0,level:0}

</script>

<div style='padding-top:60px' class='game'>
<div style='float:right;'>
{#each cards as token}
{#await getCharacter(token)}
<Card props={loadingData} on:updateCharacter={updateCharacter}></Card>
{:then p}
<Card props={p} on:updateCharacter={updateCharacter}></Card>
{/await}
{/each}
</div>
<p>
<Button on:click={createCharacter} text='Create a new character'/>
</p>
</div>

<style>
</style>