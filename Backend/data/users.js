import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@fastfood.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Marko Markovic',
        email: 'marko@fastfood.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Jovana Jovanovic',
        email: 'jovana@fastfood.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
];

export default users;