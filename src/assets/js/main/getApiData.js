const hashList = window.location.hash.split(/[#/?=]/);
const currentPool = hashList[1];
const currentPage = hashList[2];
const currentAddress = hashList[3];

async function getPoolsData() {
	try {
		const response = await fetch('https://api.altcoinpool.ru/api/pools/');
		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
		const data = await response.json();
		return data;
	} catch (error) {
		// console.error(`Could not get products: ${error}`);
	}
}

async function getPoolData() {
	try {
		const response = await fetch(
			`https://api.altcoinpool.ru/api/pools/${currentPool}`
		);
		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
		const data = await response.json();
		return data;
	} catch (error) {
		// console.error(`Could not get products: ${error}`);
	}
}

async function getPoolBlocksData() {
	try {
		const response = await fetch(
			`https://api.altcoinpool.ru/api/pools/${currentPool}/blocks?pageSize=150`
		);
		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
		const data = await response.json();
		return data;
	} catch (error) {
		// console.error(`Could not get products: ${error}`);
	}
}

async function getPoolPaymentsData() {
	try {
		const response = await fetch(
			`https://api.altcoinpool.ru/api/pools/${currentPool}/payments?pageSize=50`
		);
		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
		const data = await response.json();
		return data;
	} catch (error) {
		// console.error(`Could not get products: ${error}`);
	}
}

async function getMinersData() {
	try {
		const response = await fetch(
			`https://api.altcoinpool.ru/api/pools/${currentPool}/miners/`
		);
		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
		const data = await response.json();
		return data;
	} catch (error) {
		// console.error(`Could not get products: ${error}`);
	}
}

if (currentPool && currentAddress) {
}

async function getMinerData() {
	try {
		const response = await fetch(
			`https://api.altcoinpool.ru/api/pools/${currentPool}/miners/${currentAddress}/`
		);
		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
		const data = await response.json();
		return data;
	} catch (error) {
		// console.error(`Could not get products: ${error}`);
	}
}

async function getMinerPaymentsData() {
	try {
		const response = await fetch(
			`https://api.altcoinpool.ru/api/pools/${currentPool}/miners/${currentAddress}/payments?pageSize=30`
		);
		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
		const data = await response.json();
		return data;
	} catch (error) {
		// console.error(`Could not get products: ${error}`);
	}
}
