import mongoose from 'mongoose'
// import bcrypt from 'bcrypt'

// const SALT_WORK_FACTOR = 10
// const MAX_LOGIN_ATTEMPTS = 5
// const LOCK_TIME = 2 * 60 * 60 * 1000
const Schema = mongoose.Schema

const UserSchema = new Schema({
    role: {
        type: Number,
        default: 1 // 1是家长用户， 2是教师用户，3是超管
    },
    bind_list: { // 对应教师学生映射表中的ID
        type: Array,
        default: [String]
    },
    openid: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    avatar_url: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        default: 0
    },
    nick_name: {
        type: String,
        default: ''
    },
    province: {
        type: String,
        default: ''
    },
    inviter: {
        type: String,
        default: '' // 教师账号的邀请人，openid
    },
    apply_list: {
        type: Array,
        default: []
    },
    is_del: {
        type: Boolean,
        default: false
    },
    create_date: {
        type: String,
        default: '1590084000000'
    }
})


UserSchema.pre('save', function (next) {
    this.create_date = new Date().getTime().toString()
    next()
})

// UserSchema.pre('save', function (next) {
//     let user = this

//     if (!user.isModified('password')) return next()

//     bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//         if (err) return next(err)

//         bcrypt.hash(user.password, salt, (error, hash) => {
//             if (err) return next(error)

//             user.password = hash
//             next()
//         })
//     })
// })

// UserSchema.methods = ({
//     comparePassword: function (_password, password) {
//         return new Promise((resolve, reject) => {
//             bcrypt.compare(_password, password, (err, isMatch) => {
//                 if (!err) resolve(isMatch)
//                 else reject(err)
//             })
//         })
//     },

//     incloginAttempts: (user) => {
//         const that = this

//         return new Promise((resolve, reject) => {
//             if (that.lockUntil && that.lockUntil < Date.now()) {
//                 that.update({
//                     $set: {
//                         loginAttempts: 1
//                     },
//                     $unset: {
//                         lockUntil: 1
//                     }
//                 }, (err) => {
//                     if (!err) resolve(true)
//                     else reject(err)
//                 })
//             } else {
//                 let updates = {
//                     $in: {
//                         loginAttempts: 1
//                     }
//                 }

//                 if (that.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !that.isLocked) {
//                     updates.$set = {
//                         lockUntil: Date.now() + LOCK_TIME
//                     }
//                 }

//                 that.update(updates, err => {
//                     if (!err) resolve(true)
//                     else reject(err)
//                 })
//             }
//         })
//     }
// })

mongoose.model('User', UserSchema)
