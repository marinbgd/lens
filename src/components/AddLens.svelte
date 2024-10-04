<script>
	import { db } from '../db.js'
	import { createEventDispatcher } from 'svelte';
	import { LENS_EDITED } from '../util/const.js';
	const defaultFocalLength = 0
	const dispatch = createEventDispatcher()

	export let lens = null

	$: if (lens) {
        name = lens.name
        mount = lens.mount
        comment = lens.comment
        focalLength = lens.focalLength
        noOfBlades = lens.noOfBlades
        frontFilter = lens.frontFilter
        closestFocusingDistance = lens.closestFocusingDistance

		editedLensId = lens.id
        lens = null
        isEditMode = true
	}

	let isEditMode = false
	let status = ''
    let isInProgress = false

    let editedLensId = null
	let name = ''
	let mount = ''
	let comment = ''
	let focalLength = defaultFocalLength
	let noOfBlades = defaultFocalLength
	let frontFilter = defaultFocalLength
	let closestFocusingDistance = defaultFocalLength

	function resetForm() {
		name = ''
		mount = ''
		comment = ''
		focalLength = defaultFocalLength
		noOfBlades = defaultFocalLength
		frontFilter = defaultFocalLength
		closestFocusingDistance = defaultFocalLength

        isEditMode = false
        lens = null
        editedLensId = null
    }

	async function editLens() {
		try {
			isInProgress = true
			await db.lenses.update(editedLensId, {
				name: name,
				focalLength: focalLength,
				mount: mount,
				noOfBlades: noOfBlades,
				frontFilter: frontFilter,
				closestFocusingDistance: closestFocusingDistance,
				comment: comment,
			})

			status = `Lens ${name} successfully edited.`

            setTimeout(() => {
	            dispatch(LENS_EDITED);
				isInProgress = false
            }, 2000)

			resetForm()
		} catch (error) {
			status = `Failed to edit ${name}: ${error}`
            isInProgress = false
		}
    }

	async function addLens() {
        try {
			if (!name) {
				status = 'Lens must have a name'
				return
            }

	        isInProgress = true

			const id = await db.lenses.add({
				name: name,
				focalLength: focalLength,
                mount: mount,
                noOfBlades: noOfBlades,
                frontFilter: frontFilter,
				closestFocusingDistance: closestFocusingDistance,
				comment: comment,
			})

			status = `Lens ${name} successfully added. Got id ${id}`

            isInProgress = false

			resetForm()
		} catch (error) {
			status = `Failed to add ${name}: ${error}`
	        isInProgress = false
		}
	}
</script>
<div class="addLens">
    <p class="statusMessage">{status}</p>
    <fieldset>
        <legend>Add new Lens</legend>

        <div class="field">
            <label class="field__name" for="name">Name:</label>
            <input class="field__input" type="text" bind:value={name} id="name" />
        </div>

        <div class="field">
            <label class="field__name" for="mount">Mount:</label>
            <select class="field__input" bind:value={mount} id="mount">
                <option value="M42">M42</option>
                <option value="nikonF">Nikon F</option>
                <option value="nikonZ">Nikon Z</option>
                <option value="adaptall">Tamron Adaptall</option>
                <option value="konica">Konica</option>
                <option value="minoltaMd">Minolta MD</option>
                <option value="olympusOm">Olympus OM</option>
                <option value="exacta">Exacta</option>
            </select>
        </div>

        <div class="field">
            <label class="field__name" for="focalLength">Focal length:</label>
            <input class="field__input" type="number" bind:value={focalLength} id="focalLength" />
        </div>

        <div class="field">
            <label class="field__name" for="closestFocusingDistance">Closest focusing distance:</label>
            <input class="field__input" type="number" bind:value={closestFocusingDistance} id="closestFocusingDistance" />
        </div>

        <div class="field">
            <label class="field__name" for="noOfBlades">Number of blades:</label>
            <input class="field__input" type="number" bind:value={noOfBlades} id="noOfBlades" />
        </div>

        <div class="field">
            <label class="field__name" for="frontFilter">Front filter thread in mm:</label>
            <input class="field__input" type="number" bind:value={frontFilter} id="frontFilter" />
        </div>

        <div class="field">
            <label class="field__name" for="comment">Comment:</label>
            <textarea class="field__input" bind:value={comment} id="comment" rows="10" cols="30" />
        </div>


        <button on:click={resetForm} disabled={isInProgress}>Reset form</button>
        {#if !isEditMode}
            <button on:click={addLens} disabled={isInProgress}>Add Lens</button>
        {/if}
        {#if isEditMode}
            <button on:click={editLens} disabled={isInProgress}>Edit Lens</button>
        {/if}
    </fieldset>
</div>

<style>
    .statusMessage {
        color: orange;
    }

    .addLens {
        max-width: 50%;
        margin: auto;
    }
    .field {
        display: flex;
        margin-bottom: .5em;
    }
    .field__name {
        width: 50%;
        text-align: right;
    }
    .field__input {
        margin-left: 1em;
    }

</style>
