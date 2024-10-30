import Dexie from 'dexie';

export const db = new Dexie('lensDb');
console.log(db)
db.version(1).stores({
	lenses: '++id, name, focalLength, maxFocalLength, minFocalLength, speed, minSpeed, maxSpeed, mount, noOfBlades, frontFilter, closestFocusingDistance, weight, comment', // Primary key and indexed props
});
