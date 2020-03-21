class User {
    // declaration is important
    name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.age = age;
        this.name = name;
    }

    foo() :void {
        console.log('im an user');
    }
}

class Admin extends User {
    constructor() {
        super('asd', 123);
    }
    foo(): void {
        console.log('im an admin');
    }
}

const u = new User('asd', 213);
u.foo();

const a = new Admin();
a.foo();