export class KeyValueStore {
    constructor (prefix) {
        this.prefix = prefix
        this.storageArea = browser.storage.local;
    }

    async get(key) {
        const stored = await this.storageArea.get(this.prefixedKey(key));
        if (stored === undefined || Object.keys(stored).length < 1) {
            return null;
        }
        return stored[this.prefixedKey(key)];
    }

    async set(key, value) {
        const storageObj = {};
        storageObj[this.prefixedKey(key)] = value;
        await this.storageArea.set(storageObj);
    }

    async delete (key) {
        await this.storageArea.remove(this.prefixedKey(key));
    }

    prefixedKey(key) {
        return `${this.prefix}:${key}`;
    }
}
