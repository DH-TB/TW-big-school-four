export const get = async (url) => {
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                    'Accept': 'application/json;charset=utf-8',
                    'Content-Type': 'application/json'
                }
            ),
        });
        const body = await res.json();
        const status = res.status;

        return Object.assign({}, {body}, {status})
    } catch (ex) {
        return {status: ex.status}
    }
};
