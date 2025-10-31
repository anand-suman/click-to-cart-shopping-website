import React from 'react'
import { useRouteError, Link } from 'react-router-dom'

const RouteError = () => {
    const error = useRouteError()
    const message = (error && (error.statusText || error.message)) || 'Something went wrong.'

    return (
        <div className='min-h-[60vh] flex flex-col items-center justify-center gap-4 p-6 text-center'>
            <h1 className='text-2xl font-semibold'>Unexpected Application Error</h1>
            <p className='text-slate-600'>{message}</p>
            <div className='flex gap-3'>
                <button onClick={()=>window.location.reload()} className='px-4 py-2 bg-blue-600 text-white rounded'>Reload</button>
                <Link to='/' className='px-4 py-2 border rounded'>Go Home</Link>
            </div>
        </div>
    )
}

export default RouteError


