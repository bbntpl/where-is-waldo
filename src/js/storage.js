export function checkUser(user){
    return user == null ? false : true;
}

export function createUser(name, id){
    const user = {
        name: name,
        id: id
    }
    localStorage.setItem('user', JSON.stringify(user));
}
export function fetchUser(){
    return JSON.parse(localStorage.getItem('user'));
}