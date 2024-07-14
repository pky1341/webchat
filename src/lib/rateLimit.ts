import { LRUCache } from 'lru-cache';

type Options = {
    interval?: number;
    uniqueTokenPerInterval?: number;
}
export const rateLimit = (options: Options) => {
    const tokenChache = new LRUCache({
        max: options?.uniqueTokenPerInterval || 500,
        ttl: options?.interval || 60000,
    });

    return {
        check: (limit: number, token: number) =>
            new Promise<void>((resolve, reject) => {
                const tokenCount = (tokenChache.get(token) as number[]) || [0];
                if (tokenCount[0] === 0) {
                    tokenChache.set(token, tokenCount);
                }
                tokenCount[0] += 1;
                const currentUsage = tokenCount[0];
                const isRatedLimited = currentUsage >= limit;
                if (isRatedLimited) {
                    reject(new Error('Rate limit exceeded'));
                } else {
                    resolve();
                }
            }),
    };
}