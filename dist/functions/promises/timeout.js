/**
 * @since 2.0.0-draft
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@2.0.0-draft
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-draft
 * @license MIT
 */
/**
 * Awaits a promise, but times out if it takes too long.
 *
 * @param promise    To await.
 * @param ms         Maximum number of a milliseconds to wait.
 * @param onTimeout  Optional. Value to return on timeout, if any.
 *
 * @experimental
 */
export async function timeout(promise, ms, onTimeout) {
    let timeout;
    const timeoutPromise = new Promise((resolve, reject) => {
        timeout = setTimeout(() => {
            // returns
            if (onTimeout instanceof AbortController) {
                onTimeout.abort();
                resolve(undefined);
                return;
            }
            resolve(typeof onTimeout === 'function'
                ? onTimeout()
                : onTimeout);
        }, ms);
    });
    const response = await Promise.race([promise, timeoutPromise]);
    if (timeout) {
        clearTimeout(timeout);
    }
    return response;
}
//# sourceMappingURL=timeout.js.map