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
    <button on:click={() => sortBy(prop)}>S</button>
    {#if sort === ASC}A{/if}
    {#if sort === DESC}D{/if}

    <input type="search" bind:value={searchFilter} on:change={handleSearch} />
</th>
