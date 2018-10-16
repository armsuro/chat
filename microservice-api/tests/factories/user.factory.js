import faker from 'faker';

class UserFactory {
  generateList(count, attrs = {}) {
    let list = []
    while(count) {
      list.push(this.generate(attrs));
      count--;
    }
    return list;
  }

  generate(attrs) {
    return Object.assign({}, {
      username: faker.name.firstName(),
      password: faker.name.lastName(),
      type: '1',
    }, attrs);
  }
}

export default new UserFactory();
