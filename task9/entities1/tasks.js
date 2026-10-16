const { EntitySchema } = require('typeorm')

const taskSchema = new EntitySchema({
    name: 'task',
    tableName: 'tasks',
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        title: {
            type: String,
            nullable: false
        },
        deadline: {
            type: Date,
            nullable: false
        },
        priority: {
            type: String,
            nullable: true
        },
        category: {
            type: String,
            nullable: true
        },
        status: {
            type: String,
            nullable: true
        }
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'user',
            inverseSide: 'tasks',
            joinColumn: {
                name: 'userid'
            },
            nullable: false
        }
    }
})

module.exports = taskSchema
