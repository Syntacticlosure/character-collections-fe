<script>
export let props;
import {balance,getBalance,contract} from './Near.js';
import {createEventDispatcher} from 'svelte';
import Button from './Button.svelte';
import {CharacterPictures} from './CharPictures.js';
const dispatch = createEventDispatcher();
const backgroundUrl = CharacterPictures[props.name];
let backgroundStyle ="";
async function levelUp(){
    await $contract.level_up_character({token:props.token});
    balance.set(await getBalance());
    dispatch('updateCharacter',{token:props.token});
}

if (backgroundUrl)
    backgroundStyle = `background-image:url(${backgroundUrl})`;


</script>

<div class='card' style={backgroundStyle}>
<table>

<tr>
<td>Name</td>
<td>{props.name}</td>
</tr>

<tr>
<td>Level</td>
<td>{props.level}</td>
</tr>

<tr>
<td>Attack</td>
<td class:red = {props.attack>=100}>{props.attack}
{#if props.attack>=100}<div class='epic'>epic level attack</div>{/if}</td>
</tr>

<tr>
<td>Defense</td>
<td class:red = {props.defense>=100}>{props.defense}
{#if props.defense>=100}<div class='epic'>epic level defense</div>{/if}</td>
</tr>


<tr>
<Button on:click={levelUp} text='Level Up'/>
</tr>
</table>
</div>

<style>
div.card{
    display:inline-block;
    width:300px;
    height:400px;
    border:1px solid black;
    margin:3px;
    background-size:100%;
    background-repeat: no-repeat;
    position: relative;
}
table {
    display:block;
    background-color:black;
    opacity: 60%;
    color:white;
    width : 100%;
    position: absolute;
    bottom:0px;
}

td{
    width:40%;
    text-align:left;
}
td.red{
    color :red;
}
div.epic {
    display: none;
    z-index:1;
}
td.red:hover div.epic{
    display:block;
    z-index: 1;
    background-color: blue;
    color:white;
    position: absolute;
    padding:3px;
    border-radius: 3px;
    transform: translate(0%,-150%)
}


</style>