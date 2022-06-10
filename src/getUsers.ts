export interface User {
    id: string;
    name: string;
}

export function getUsers(): Promise<User> {
    return Promise.resolve({id: '1', name: 'David'})
}
