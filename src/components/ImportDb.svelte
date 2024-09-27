<script>
	import Dexie from "dexie";
	import { importDB } from "dexie-export-import";

	function progressCallback ({totalRows, completedRows}) {
		console.log(`Progress: ${completedRows} of ${totalRows} rows completed`);
	}

	async function handleImportClick() {
		console.log('clicked');
	}
	function handleDragover(event) {
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';
    }

	async function handleDrop (event) {
		console.log('drop', event);
		event.stopPropagation();
		event.preventDefault();
		let db = new Dexie('lensDb');
		db.version(1).stores({
			lenses: '++id, name, focalLength, mount, noOfBlades, frontFilter, closestFocusingDistance, comment', // Primary key and indexed props
		});

		// Pick the File from the drop event (a File is also a Blob):
		const file = event.dataTransfer.files[0];
		try {
			if (!file) throw new Error(`Only files can be dropped here`);
			console.log("Importing " + file.name);
			await db.delete();
			db = await Dexie.import(file, {
				progressCallback
			});
			console.log("Import complete");
		} catch (error) {
			console.error(''+error);
		}
	}
</script>

<button on:click={handleImportClick}>Import DB</button>

<div id="dropzone" on:dragover={handleDragover} on:drop={handleDrop}>
    Drop dexie export JSON file here
</div>

<style>
    #dropzone {
        width: 600px;
        height: 20px;
        border: 2px dotted #bbb;
        border-radius: 10px;
        padding: 35px;
        color: #bbb;
        text-align: center;
    }
</style>
