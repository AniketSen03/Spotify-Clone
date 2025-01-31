import React from 'react'

const Aside = () => {
    return (
        <>
            <div className='ml-5 rounded-xl bg-zinc-900 flex flex-col items-center justify-between h-[85vh] w-96 p-4 text-white adjust-aside'>
                <div className='flex justify-between items-center px-4 h-12 bg-primary w-72'>
                    <div className='flex items-center w-72'>
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" className="h-7 svg-adjust invert Svg-sc-ytk21e-0 bneLcE"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path></svg>
                        <span className='ml-3 font-bold'>Your Library</span></div>
                    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="h-7 svg-adjust invert Svg-sc-ytk21e-0 dYnaPI"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg>
                </div>
                <div className='flex flex-col justify-evenly h-40 px-4 bg-primary w-72'>
                    <span className='font-semibold'>Create your first playlist</span>
                    <span className='font-thin'>It's easy, we'll help you</span>
                    <button className=' bg-white text-black font-semibold rounded-full py-2 px-5 btn-adjust'>Create playlist</button>
                </div>
                <div className='flex flex-col h-40 justify-evenly px-4 bg-primary w-72'>
                    <span className='font-semibold'>Let's find some podcasts to follow</span>
                    <span className='font-thin'>We'll keep you updated on new episodes</span>
                    <button className=' bg-white text-black font-semibold rounded-full py-2 px-5 btn-adjust'>Browse podcasts</button>
                </div>
                <ul className='flex flex-wrap px-4 bg-primary w-72'>
                    <li className='text-xs m-1 text-zinc-300'>Legal</li>
                    <li className='text-xs m-1 text-zinc-300'>Safety&PrivacyCenter</li>
                    <li className='text-xs m-1 text-zinc-300'>PrivacyPolicy</li>
                    <li className='text-xs m-1 text-zinc-300'>Coookies</li>
                    <li className='text-xs m-1 text-zinc-300'>About Ads</li>
                    <li className='text-xs m-1 text-zinc-300'>Accessibilty</li>
                    <li className='text-xs m-1 text-zinc-300'>Cookies</li>
                </ul>
                <button className='mt-2 border-white border rounded-full flex items-center justify-center w-32 p-1 lang-adjust'>
                    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="h-7 svg-adjust invert Svg-sc-ytk21e-0 dYnaPI"><path d="M8.152 16H8a8 8 0 1 1 .152 0zm-.41-14.202c-.226.273-.463.713-.677 1.323-.369 1.055-.626 2.496-.687 4.129h3.547c-.06-1.633-.318-3.074-.687-4.129-.213-.61-.45-1.05-.676-1.323-.194-.235-.326-.285-.385-.296h-.044c-.055.007-.19.052-.391.296zM4.877 7.25c.062-1.771.34-3.386.773-4.624.099-.284.208-.554.329-.806a6.507 6.507 0 0 0-4.436 5.43h3.334zm-3.334 1.5a6.507 6.507 0 0 0 4.436 5.43 7.974 7.974 0 0 1-.33-.806c-.433-1.238-.71-2.853-.772-4.624H1.543zm4.835 0c.061 1.633.318 3.074.687 4.129.214.61.451 1.05.677 1.323.202.244.336.29.391.297l.044-.001c.06-.01.19-.061.385-.296.226-.273.463-.713.676-1.323.37-1.055.626-2.496.687-4.129H6.378zm5.048 0c-.061 1.771-.339 3.386-.772 4.624-.082.235-.171.46-.268.674a6.506 6.506 0 0 0 4.071-5.298h-3.03zm3.031-1.5a6.507 6.507 0 0 0-4.071-5.298c.097.214.186.44.268.674.433 1.238.711 2.853.772 4.624h3.031z"></path></svg>
                    <span className='ml-2'>English</span>
                </button>
            </div>
        </>
    )
}

export default Aside