<script>
	import { exportDB } from "dexie-export-import";
	import { db } from '../db.js'
    import download from "downloadjs";

	let error = ''

	function progressCallback ({totalRows, completedRows}) {
		console.log(`Progress: ${completedRows} of ${totalRows} rows completed`);
	}

	async function handleExportClick() {
		console.log('clicked');
		try {
			//const blob = await db.export({ prettyJson: true, progressCallback });
            const blob = await exportDB(db, { prettyJson: true, progressCallback });
			download(blob, "dexie-export.json", "application/json");
		} catch (error) {
			console.error(''+error);
		}
    }
</script>

<button on:click={handleExportClick}>Export DB</button>
{#if error}
    <p class="error" >{error}</p>
{/if}

<style>
    .error {
        color: red;
    }
</style>
