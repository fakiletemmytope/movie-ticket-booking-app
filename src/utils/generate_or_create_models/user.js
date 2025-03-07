import { faker } from '@faker-js/faker';
import { Status, userModel, UserType } from '../../schema/user.js';
import { hash_password } from '../password.js';
import { db_connect } from "../../database/db.js"


function getRandomEnum(enumObject) {
    const enum_type = Object.values(enumObject);
    const randomIndex = Math.floor(Math.random() * enum_type.length);
    return enum_type[randomIndex]
}

const generate_user = async (usertype) => {
    const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: "*.Oluwaseyi88.*",
        userType: usertype || getRandomEnum(UserType),
        address: `${faker.location.streetAddress({ useFullAddress: true })}`
    }
    return user
}

const generate_many_users = async (count, usertype) => {
    const users = await Promise.all(
        Array.from({ length: count }, async () => await generate_a_random_user(usertype))
    );
    return users;
}


const create_user = async (status = null) => {
    const user = await generate_user()
    user.password = await hash_password(user.password)
    user.status = status || getRandomEnum(Status)
    await db_connect()
    const saved_user = await userModel.create(user)
    return saved_user
}

console.log(await create_user())