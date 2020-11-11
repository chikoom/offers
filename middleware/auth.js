export default async function(context) {
  const response = await context.app.$axios.$post('/api/auth/token')
}
