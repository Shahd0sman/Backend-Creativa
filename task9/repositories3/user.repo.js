const data = require('../db2')

class UserRepository {
    get user() {
        return data.getRepository('user')
    }

    async findByEmail(email) {
        return this.user.findOneBy({ email })
    }

    async createUser(userData) {
        const user = this.user.create(userData)
        return this.user.save(user)
    }
}

module.exports = UserRepository
