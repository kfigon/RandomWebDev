test('iter', () => {
    const company = {
        employees: ['first', 'foo', 'bar'],
        curEmployee: 0,
        // iterator - next method
        next() {
            const value = this.employees[this.curEmployee];
            if (this.curEmployee >= this.employees.length) {
                return { value: value, done: true };
            }
            const out = { value: value, done: false };
            this.curEmployee++;
            return out;
        }
    };

    expect(company.next().done).toBe(false);
    expect(company.next().done).toBe(false);
    expect(company.next().done).toBe(false);
    expect(company.next().done).toBe(true);
    expect(company.next().done).toBe(true);
    expect(company.next().done).toBe(true);
    expect(company.next().done).toBe(true);
});

test('generator', () => {
    // generator sam buduje iterator
    const company = {
        employees: ['first', 'foo', 'bar'],
        getEmployees: function* emploGenerator() {
            for (let i = 0; i < this.employees.length; i++) {
                yield this.employees[i];
            }
        }
    };

    const it = company.getEmployees();
    expect(it.next().done).toBe(false);
    expect(it.next().done).toBe(false);
    expect(it.next().done).toBe(false);
    expect(it.next().done).toBe(true);
    expect(it.next().done).toBe(true);
});

test('generator + iterator', () => {
    const company = {
        employees: ['first', 'foo', 'bar'],
        [Symbol.iterator]: function* emploGenerator() {
            for (let i = 0; i < this.employees.length; i++) {
                yield this.employees[i];
            }
        }
    };

    let data = '';
    for (const el of company) {
        data += el + ' ';
    }
    expect(data).toBe('first foo bar ');
});