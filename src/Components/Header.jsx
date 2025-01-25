import React from 'react'

const Header = () => {
    return (
        <>
            <div className='flex items-center justify-between px-4 h-16'>
                <img src="src/assets/Logo.png" alt="not found" className='h-10' />
                <div className='flex items-center justify-between'>
                    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" className="h-12 invert bg-[#dcdcdc] rounded-full p-2 Svg-sc-ytk21e-0 bneLcE"><path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path></svg>
                    <div className='flex items-center mx-5 px-4 rounded-3xl bg-primary'>
                        <svg data-encore-id="icon" role="img" aria-hidden="true" data-testid="search-icon" className="h-9 invert Svg-sc-ytk21e-0 bHdpig M9l40ptEBXPm03dU3X1k" viewBox="0 0 24 24"><path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"></path></svg>
                        <input type="search" className='p-3 w-[26em] bg-primary text-white' placeholder='What do you want to play?' />
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" className="h-9 border-l-white invert Svg-sc-ytk21e-0 bneLcE"><path d="M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path><path d="M1.513 9.37A1 1 0 0 1 2.291 9h19.418a1 1 0 0 1 .979 1.208l-2.339 11a1 1 0 0 1-.978.792H4.63a1 1 0 0 1-.978-.792l-2.339-11a1 1 0 0 1 .201-.837zM3.525 11l1.913 9h13.123l1.913-9H3.525zM4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-2V3H6v3H4V2z"></path></svg>
                    </div>
                </div>
                <div className='bg-green-500 font-semibold px-5 py-3 text-center rounded-full'>A</div>
            </div>
        </>
    )
}

export default Header