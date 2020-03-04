<script>
export let text;
</script>
<button on:click>{text}</button>

<style>
button {
    margin:3px;
    height:30px;
    background-color:lightblue;
    border:none;
    box-shadow: 0 2px 4px 4px blue;
}
button:hover{
    color:white;
    background-color:blue;
}
</style>