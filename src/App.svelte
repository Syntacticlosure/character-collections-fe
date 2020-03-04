<script>
import LogIn from './LogIn.svelte';
import Game from './Game.svelte';
import {contract} from './Near.js';
</script>


<main>
 <LogIn/>
 {#if $contract}
 <Game/>
 {/if}
</main>

<style>
</style>
