class Users{

    #id;
    #lastname;
    #firstname;
    #email;
    #role;
    #hashpasswd

    constructor(id, lastname, firstname, email, role, hashpasswd){
        this.id = id
        this.lastname = lastname
        this.firstname = firstname
        this.email = email
        this.role = role
        this.hashpasswd = hashpasswd
    }
    
    get getId() {
        return this.#id;
    }

    setId(id) {
        this.#id = id;
    }

    get getLastname() {
        return this.#lastname;
    }

    setLastname(lastname) {
        this.#lastname = lastname;
    }

    get getFirstname() {
        return this.#firstname;
    }

    setFirstname(firstname) {
        this.#firstname = firstname
    }
}