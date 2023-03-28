import qs from "qs"

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */

// process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
export function getStrapiURL(path = "") {
  return `${"https://api.staging.finezzy.com/strapi"}${path}`
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer cdfbeade494406a36c6166432096829aaf1d272f726ebfec034608de1eb969fbf189cd4ba265f3add21491a118d35452b1bda9f61a4482ee04aed63dccd2faf4ca3134c6c31421f10310cd46e4872226d66eaecbb599252ccfd1f636f9468d362a03d9318f425f9d212ba1fe4582e027a05d65f273e592bca5e1d7cd8ebe7e33",
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data
}
