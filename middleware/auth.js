export default async function(context) {
  alert('hey')
  console.log('refreshing')
  const response = await context.app.$axios.$post('/api/auth/token')
  console.log('mid', response)
  // context.$auth.refreshTokens()
  // context.$router.push('/')
}
