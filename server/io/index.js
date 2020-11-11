// An example svc:
export default function(socket, io) {
  return Object.freeze({
    /* Just define the methods here */
    test(msg) {
      socket.emit('index-hello', msg)
      return { status: 'index-ok' }
    },
    async fn2(msg) {
      return true
    },
    fn3(msg) {
      socket.emit('back', 'index-back')
    }
  })
}
