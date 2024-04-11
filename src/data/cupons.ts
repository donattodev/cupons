import { faker } from '@faker-js/faker'

export const cupons = Array.from({ length: 212 }).map(() => {
  return {
    id: faker.number.int({ min: 10000, max: 20000 }),
    name: faker.person.fullName(),
    valor: faker.helpers.arrayElement([
      '5',
      '10',
      '15',
      '20',
      '25',
      '30',
      '35',
      '40',
      '45',
      '50',
      '55',
      '60',
      '65',
      '70',
      '75',
      '80',
    ]),
    loja: faker.person.fullName(),
    category: faker.person.fullName(),
    location: faker.helpers.arrayElement([
      'vitoria-da-conquista',
      'itapetinga',
      'salvador',
    ]),
    quantidade: faker.number.int({ min: 1, max: 100 }),
  }
})
