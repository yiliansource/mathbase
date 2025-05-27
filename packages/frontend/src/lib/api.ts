export function getApiBase() {
    return process.env.NEXT_PUBLIC_API_BASE;
}

export function getApiUrl(slug: string) {
    return getApiBase() + slug;
}
