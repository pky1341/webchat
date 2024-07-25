import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
    }
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
(async () => {
    await redisClient.connect();
})();

export default redisClient;