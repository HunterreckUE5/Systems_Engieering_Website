class LocalStorageHelper {
    static get(key) {
        const value = localStorage.getItem(key);
        return value !== null ? JSON.parse(value) : -1;
    }

    static set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static remove(key) {
        localStorage.removeItem(key);
    }
}

export default LocalStorageHelper;