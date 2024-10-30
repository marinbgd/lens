<script>
	import { liveQuery } from 'dexie'
	import { db } from '../db.js'
	import LensTh from './LensTh.svelte'
	import { ASC, CLICKED_LENS, DESC, MOUNT_MAP, NOT_AVAILABLE } from '../util/const.js';
	import { filterByFullTextSearch, isNumeric } from '../util/util.js';
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	let sort = {}

	let lenses = liveQuery(
		() => db.lenses.toArray()
	);

    async function removeLens(id) {
        await db.lenses.delete(id)
    }

	async function sortBy(key) {
        lenses = liveQuery(
	        () => {
                if (sort[key] && sort[key] === ASC) {
					sort[key] = DESC
	                return db.lenses.orderBy(key).reverse().toArray()
                } else {
	                sort[key] = ASC;
	                return db.lenses.orderBy(key).toArray()
                }
			}
        );
    }

	async function filterBy(prop, searchText) {
		lenses = liveQuery(
			() => {
                if (searchText) {
	                if (isNumeric(searchText)) {
		                return db.lenses.where(prop).equals(+searchText).toArray()
	                } else {
		                //return db.lenses.where(prop).startsWithIgnoreCase(searchText).toArray()
		                return db.lenses.filter(lens => filterByFullTextSearch(lens, prop, searchText)).toArray()
                    }
                } else {
	                return db.lenses.toArray()
                }
			}
		);
	}

	function handleSortBy(event) {
        sortBy(event.detail);
    }

	function handleFilterBy(event) {
        filterBy(event.detail.prop, event.detail.search)
	}

	function handleRowClick(event, lens) {
		dispatch(CLICKED_LENS, lens)
    }

	function mapMountValueToText(mountValue) {
		const foundMount = MOUNT_MAP[mountValue]
        if (foundMount) {
			return foundMount.displayName
        }
		return mountValue
    }

	function renderZero(value) {
		if (typeof value === 'undefined' || value === null) {
			return NOT_AVAILABLE
		}
		return value
    }

	function renderLensSpeed(lens) {
		if (lens.maxSpeed && lens.minSpeed) {
			return `${lens.maxSpeed} - ${lens.minSpeed}`
		}

		if (lens.speed) {
			return lens.speed
        }

		if (lens.maxSpeed) {
			return lens.maxSpeed
        }

		if (lens.minSpeed) {
			return lens.minSpeed
		}

		return NOT_AVAILABLE
    }

	function renderLensFocalLength(lens) {
		if (lens.minFocalLength && lens.maxFocalLength) {
			return `${lens.minFocalLength} - ${lens.maxFocalLength}`
		}

		if (lens.focalLength) {
			return lens.focalLength
		}

		if (lens.minFocalLength) {
			return lens.minFocalLength
		}

		if (lens.maxFocalLength) {
			return lens.maxFocalLength
		}

		return NOT_AVAILABLE
    }

</script>
{#if $lenses}
    <table>
        <thead>
        <tr>
            <th>No</th>
            <LensTh name="Name" prop="name" sort={sort['name']} on:sortByEvent={handleSortBy} on:filterByEvent={handleFilterBy} />
            <LensTh name="Focal length" prop="focalLength" sort={sort['focalLength']} on:sortByEvent={handleSortBy} on:filterByEvent={handleFilterBy} />
            <LensTh name="Speed" prop="speed" sort={sort['speed']} on:sortByEvent={handleSortBy} on:filterByEvent={handleFilterBy} />
            <LensTh name="Mount" prop="mount" sort={sort['mount']} on:sortByEvent={handleSortBy} on:filterByEvent={handleFilterBy} />
            <LensTh name="No of blades" prop="noOfBlades" sort={sort['noOfBlades']} on:sortByEvent={handleSortBy} on:filterByEvent={handleFilterBy} />
            <LensTh name="Front filter" prop="frontFilter" sort={sort['frontFilter']} on:sortByEvent={handleSortBy} on:filterByEvent={handleFilterBy} />
            <LensTh name="Closest focusing distance" prop="closestFocusingDistance" sort={sort['closestFocusingDistance']} on:sortByEvent={handleSortBy} on:filterByEvent={handleFilterBy} />
            <th>Comment</th>
            <th>X</th>
        </tr>
        </thead>
        {#each $lenses as lens, index (lens.id)}
            <tr on:click={(event) => handleRowClick(event, lens)}>
                <td>{index + 1}</td>
                <td>{lens.name}</td>
                <td>{renderLensFocalLength(lens)}</td>
                <td>{renderLensSpeed(lens)}</td>
                <td>{mapMountValueToText(lens.mount) || NOT_AVAILABLE}</td>
                <td>{renderZero(lens.noOfBlades)}</td>
                <td>{renderZero(lens.frontFilter)}</td>
                <td>{renderZero(lens.closestFocusingDistance)}</td>
                <td>{lens.comment || NOT_AVAILABLE}</td>
                <td>
                    <button on:click={() => removeLens(lens.id)}>X</button>
                </td>
            </tr>
        {/each}
    </table>
{:else}
    <p>No lenses in the DB</p>
{/if}



<style>
    table {
        width: 100%;
        border: 2px solid black;
        border-collapse: collapse;
        margin: 1em 0;
        background-color: #213547;
    }
    th {
        width: auto;
        border: 1px solid black;
        background-color: #112241;
    }
    td {
        width: auto;
        border: 1px solid black;
    }
    td:nth-child(2),
    th:nth-child(2) {
        width: 50%;
    }
</style>
