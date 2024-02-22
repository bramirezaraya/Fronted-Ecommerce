
export {default} from 'next-auth/middleware'
// para las rutas que quiero que se aplique el middleware.
export const config = {
  matcher: ['/Carrito/:path*'],
}