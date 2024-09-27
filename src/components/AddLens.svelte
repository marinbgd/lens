<script>
	import { db } from '../db.js'

	export let defaultFocalLength = 0

	let status = ''

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
    }

	async function addLens() {
        try {
			if (!name) {
				status = 'Lens must have a name'
				return
            }

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

			resetForm()
		} catch (error) {
			status = `Failed to add ${name}: ${error}`
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

        <button on:click={addLens}>Add Lens</button>
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
