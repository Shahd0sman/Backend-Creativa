const test = require('node:test')
const assert = require('node:assert/strict')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserService = require('../services4/user.service')
const TaskService = require('../services4/task.service')

const originalJwtSecret = process.env.JWT_SECRET
process.env.JWT_SECRET = 'task9-service-test-secret'

test('user service registers a user with a hashed password and omits the password from its result', async () => {
    const service = new UserService()
    let savedUserData
    service.userRepository = {
        async findByEmail() {
            return null
        },
        async createUser(userData) {
            savedUserData = userData
            return { id: 7, role: 'user', ...userData }
        }
    }

    const result = await service.register({
        username: 'Shahd',
        email: 'shahd@example.com',
        password: 'password123'
    })

    assert.equal(savedUserData.username, 'Shahd')
    assert.equal(savedUserData.email, 'shahd@example.com')
    assert.notEqual(savedUserData.password, 'password123')
    assert.equal(await bcrypt.compare('password123', savedUserData.password), true)
    assert.deepEqual(result, { id: 7, role: 'user', username: 'Shahd', email: 'shahd@example.com' })
    assert.equal(Object.hasOwn(result, 'password'), false)
})

test('user service rejects registration when the email is already in use', async () => {
    const service = new UserService()
    let createCalled = false
    service.userRepository = {
        async findByEmail() {
            return { id: 7 }
        },
        async createUser() {
            createCalled = true
        }
    }

    await assert.rejects(
        service.register({ username: 'Shahd', email: 'shahd@example.com', password: 'password123' }),
        (error) => error.statusCode === 409
    )
    assert.equal(createCalled, false)
})

test('user service logs in with a valid password and returns a verifiable token', async () => {
    const service = new UserService()
    const passwordHash = await bcrypt.hash('password123', 4)
    service.userRepository = {
        async findByEmail() {
            return {
                id: 7,
                username: 'Shahd',
                email: 'shahd@example.com',
                password: passwordHash,
                role: 'user'
            }
        }
    }

    const result = await service.login({ email: 'shahd@example.com', password: 'password123' })
    const payload = jwt.verify(result.token, process.env.JWT_SECRET)

    assert.equal(payload.id, 7)
    assert.equal(payload.email, 'shahd@example.com')
    assert.equal(result.user.username, 'Shahd')
    assert.equal(Object.hasOwn(result.user, 'password'), false)
})

test('user service rejects an unknown email or incorrect password with the same unauthorized error', async (t) => {
    const service = new UserService()
    service.userRepository = {
        async findByEmail(email) {
            if (email === 'missing@example.com') return null
            return {
                id: 7,
                email,
                password: await bcrypt.hash('password123', 4),
                role: 'user'
            }
        }
    }

    await t.test('unknown email', async () => {
        await assert.rejects(
            service.login({ email: 'missing@example.com', password: 'password123' }),
            (error) => error.statusCode === 401 && error.message === 'Invalid email or password'
        )
    })

    await t.test('incorrect password', async () => {
        await assert.rejects(
            service.login({ email: 'shahd@example.com', password: 'incorrect123' }),
            (error) => error.statusCode === 401 && error.message === 'Invalid email or password'
        )
    })
})

test('task service forwards create and list operations to the repository', async () => {
    const service = new TaskService()
    const taskData = { title: 'Study', deadline: new Date('2026-11-10') }
    const expectedTask = { id: 11, ...taskData }
    const expectedTasks = [expectedTask]
    let createArgs
    let listUserId
    service.taskRepository = {
        async createTask(...args) {
            createArgs = args
            return expectedTask
        },
        async findByUserId(userId) {
            listUserId = userId
            return expectedTasks
        }
    }

    assert.equal(await service.createTask(taskData, 7), expectedTask)
    assert.deepEqual(createArgs, [taskData, 7])
    assert.equal(await service.getTasks(7), expectedTasks)
    assert.equal(listUserId, 7)
})

test('task service returns an updated task or reports that it was not found', async (t) => {
    const service = new TaskService()
    const taskData = { title: 'Updated title' }
    const updatedTask = { id: 11, ...taskData }
    let updateArgs
    service.taskRepository = {
        async updateTask(...args) {
            updateArgs = args
            return updatedTask
        }
    }

    assert.equal(await service.updateTask(11, 7, taskData), updatedTask)
    assert.deepEqual(updateArgs, [11, 7, taskData])

    await t.test('missing task', async () => {
        service.taskRepository.updateTask = async () => null
        await assert.rejects(service.updateTask(11, 7, taskData), (error) => error.statusCode === 404)
    })
})

test('task service deletes a task or reports that it was not found', async (t) => {
    const service = new TaskService()
    const deletedTask = { id: 11, title: 'Study' }
    let deleteArgs
    service.taskRepository = {
        async deleteTask(...args) {
            deleteArgs = args
            return deletedTask
        }
    }

    assert.equal(await service.deleteTask(11, 7), deletedTask)
    assert.deepEqual(deleteArgs, [11, 7])

    await t.test('missing task', async () => {
        service.taskRepository.deleteTask = async () => null
        await assert.rejects(service.deleteTask(11, 7), (error) => error.statusCode === 404)
    })
})

test.after(() => {
    if (originalJwtSecret === undefined) {
        delete process.env.JWT_SECRET
    } else {
        process.env.JWT_SECRET = originalJwtSecret
    }
})
