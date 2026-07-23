/**
 * Resolves auth credentials from .env, preferring browser-specific overrides when BROWSER is set.
 * Expected variables: USER_NAME / PASSWORD and optional USER_NAME_{BROWSER} / PASSWORD_{BROWSER}.
 */
export function getAuthCredentials(): { email: string; password: string } {
  const browserEnv = process.env.BROWSER?.toUpperCase()
  const email = (browserEnv && process.env[`USER_NAME_${browserEnv}`]) || process.env.USER_NAME
  const password = (browserEnv && process.env[`PASSWORD_${browserEnv}`]) || process.env.PASSWORD

  if (!email || !password) {
    throw new Error('USER_NAME and PASSWORD must be set in .env')
  }

  return { email, password }
}
