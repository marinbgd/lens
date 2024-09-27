import Dexie from 'dexie';

export const db = new Dexie('lensDb');
console.log(db)
db.version(1).stores({
	lenses: '++id, name, focalLength, mount, noOfBlades, frontFilter, closestFocusingDistance, comment', // Primary key and indexed props
});
