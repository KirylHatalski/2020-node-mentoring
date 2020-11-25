export const customSort = (array, field = 'id') => {
    const comparator = (a, b) => {
        if(a[field] > b[field]) return 1;
        if(a[field] < b[field]) return -1;
        return 0;
    }
    return array.sort(comparator);
}

export const getAutoSuggestUsers = (users, loginSubstring, limit) => {
    let tmpUsers = users.filter(elem => ~elem.login.indexOf(loginSubstring));
    return tmpUsers.length > limit ? tmpUsers.slice(0, limit) : tmpUsers;
}