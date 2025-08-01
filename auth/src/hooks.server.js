// @ts-nocheck
import { redirect } from '@sveltejs/kit'

export const handle = async ( { event, resolve } ) =>
{
    return resolve( event )
}

// for production if you need only HTTPS in browser
// if ( process.env.NODE_ENV === 'production' )
//     {
//         const protocol = event.request.headers.get( "x-forwarded-proto" ) || event.url.protocol
//         if(protocol !== "https")
//         {
//             return redirect( 308, event.url.href.replace( /^http:/, 'https:' ) )
//         }
//         const response = await resolve( event )
//         response?.headers.set('Strict-Transport-Security', 'max-age=63072000;includeSubDomains;preload')
//         return response
//     }