import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { addPinToBoard } from '../boardapi.js';

async function pushFromFile({ filePath, limit = Infinity, start = 0 } = {}) {
	const defaultPath = fileURLToPath(new URL('./scraped_pins.json', import.meta.url));
	const absPath = filePath ? path.resolve(filePath) : defaultPath;

	if (!fs.existsSync(absPath)) {
		throw new Error(`File not found: ${absPath}`);
	}

	const raw = fs.readFileSync(absPath, 'utf-8');
	let items;
	try {
		items = JSON.parse(raw);
	} catch (err) {
		throw new Error(`Invalid JSON in ${absPath}: ${err.message}`);
	}

	const results = [];
	const failures = [];

	const slice = items.slice(start, start + limit);

	for (let i = 0; i < slice.length; i++) {
		const item = slice[i];
		try {
			const inserted = await addPinToBoard({ src: item.src, width: item.width, height: item.height });
			results.push({ success: true, item, inserted });
			console.log(`Inserted ${i + start + 1}/${items.length}:`, item.src);
		} catch (err) {
			console.error(`Failed ${i + start + 1}/${items.length}:`, item.src, err.message);
			failures.push({ item, error: err.message });
		}
	}

	// write failures file if any
	if (failures.length > 0) {
		const failPath = path.resolve(new URL('./failed_push.json', import.meta.url).pathname);
		fs.writeFileSync(failPath, JSON.stringify(failures, null, 2), 'utf-8');
		console.log(`Wrote ${failures.length} failures to ${failPath}`);
	}

	return { inserted: results.length, failed: failures.length };
}

// CLI entry
if (process.argv[1] && (process.argv[1].endsWith('push.js') || process.argv[1].endsWith('push'))) {
	const fileArg = process.argv[2];
	const limitArg = process.argv[3] ? Number(process.argv[3]) : undefined;
	const startArg = process.argv[4] ? Number(process.argv[4]) : undefined;

	pushFromFile({ filePath: fileArg, limit: limitArg || Infinity, start: startArg || 0 })
		.then((res) => {
			console.log('Done:', res);
			process.exit(0);
		})
		.catch((err) => {
			console.error('Error pushing pins:', err);
			process.exit(2);
		});
}

export { pushFromFile };
