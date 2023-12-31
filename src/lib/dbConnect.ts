import mongoose, { mongo } from 'mongoose'
const { GridFSBucket } = require("mongodb");


const MONGODB_URI = process.env.MONGODB_URI || ''


if (!MONGODB_URI.length) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export default async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false
        }
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export async function getBucket() {
    if(cached.bucket) {
        return cached.bucket
    }
    await dbConnect()
    cached.bucket = new GridFSBucket(mongoose.connection, {
        bucketName: 'images'
    })
    return cached.bucket
}

export async function generateId() {
    await dbConnect()
    return new mongoose.Types.ObjectId()
}