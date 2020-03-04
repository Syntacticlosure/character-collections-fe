<script>
import {near,nearWallet,contract,balance} from './Near.js';
let connectPromise = async function(){
    const config = {
        networkId: 'default',                                             // this can be any label to namespace user accounts
        nodeUrl: "https://rpc.nearprotocol.com",                          // this endpoint must point to the network you want to reach
        walletUrl: "http://wallet.nearprotocol.com",                      // this endpoint must exist for the wallet to work
        deps: {
            keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() // keys are stored as plaintext in LocalStorage
        }
    };
    near.set(await nearlib.connect(config));
    nearWallet.set(new nearlib.WalletAccount($near));
    if ($nearWallet.isSignedIn()){
    contract.set(await $near.loadContract('syntest1',{
        viewMethods : ['get_character_owner','get_characters_by_owner','get_character',
        'get_balance'],
        changeMethods :['create_random_character','transfer','level_up_character'],
        sender:$nearWallet.getAccountId()
    }));
}
}();

function logIn(){
    $nearWallet.requestSignIn('syntest1','Character Collections');
}
function logOut(){
    $nearWallet.signOut();
    contract.set(null);
}
</script>

<div class='nav_bar'>
{#await connectPromise}
<div>
<button>Connecting to Testing NetWork of Near</button>
</div>
{:then}
<button>Connected to Testing NetWork of Near</button>
<div class='right'>
{#if $contract}
Hello,<div class = 'bold'>{$nearWallet.getAccountId()}</div> 
<div class = 'money'> -- {$balance} Coins-- </div>
<button on:click={logOut}>Log Out</button>
{:else}
<button on:click={logIn}>Log In</button>
{/if}
</div>
{:catch}
<button>Connection Failed</button>
{/await}
</div>


<style>
button {
    display:inline-block;
    border-width:0 1px 0 1px;
    border-color:black;
    margin:0px;
    padding:10px;
    background-color: inherit;
}
button:hover{
    background-color:black;
    color:white;
}

div.nav_bar{
    background-color:lightgrey;
    padding:0;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    overflow:hidden;
    z-index: 1;
}
div.bold{
    font-weight:bold;
    display:inline-block;
}
div.money{
    display:inline-block;
    color:gold;
    font-weight: bold;
}
div.right {
    display:inline-block;
    float:right;
}
</style>