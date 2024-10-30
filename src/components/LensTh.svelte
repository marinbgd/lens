<script>
	import { createEventDispatcher } from 'svelte'
	import { ASC, DESC, FILTER_BY, SORT_BY } from '../util/const.js'

	const dispatch = createEventDispatcher()

    export let name = ''
    export let prop = ''
    export let sort = ''

    let searchFilter = ''

    function sortBy(prop) {
	    dispatch(SORT_BY, prop)
    }

	function handleSearch(event) {
		dispatch(FILTER_BY, {prop, search: event.target.value})
    }
</script>

<th>
    {name}
    <button on:click={() => sortBy(prop)}>
        S
        {#if sort === ASC}<span class="sort-icon sort-icon__asc"></span>{/if}
        {#if sort === DESC}<span class="sort-icon sort-icon__desc"></span>{/if}
    </button>

    <input type="search" bind:value={searchFilter} on:change={handleSearch} />
</th>

<style>
    button {
        padding: 0.125em 0.5em;
        color: grey;
        position: relative;
    }
    .sort-icon {
        display: inline-block;
        position: relative;
        top: 0;
        right: 0;

        width: 0;
        height: 0;
        border: 0.5em solid transparent;
    }

    .sort-icon__desc {
        border-top-color: transparent;
        border-bottom-color: white;
    }

    .sort-icon__asc {
        top: 0.5em;
        border-bottom-color: transparent;
        border-top-color: white;
    }
</style>
