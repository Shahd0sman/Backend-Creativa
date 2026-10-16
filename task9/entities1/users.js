const { EntitySchema } = require('typeorm')

const userSchema = new EntitySchema({
    name: 'user',
    tableName: 'users',
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        username: {
            type: String,
            nullable: false
        },
        email: {
            type: String,
            unique: true,
            nullable: false
        },
        password: {
            type: String,
            nullable: false
        },
        createdAt: {
            type: 'timestamp',
            createDate: true
        },
        role: {
            type: String,
            default: 'user',
            nullable: false
        }
    },
    relations: {
        tasks: {
            type: 'one-to-many',
            target: 'task',
            inverseSide: 'user'
        }
    }
})

module.exports = userSchema
