import React from 'react'

const Footer = () => {
  return (
    <div className='bg-zinc-900 py-10 text-white'>
      <div className='flex flex-wrap justify-between px-6 capitalize pb-5 items-start gap-6'>
        <div className='leading-[2.5]'>
          <h1 className='font-extrabold'>Company</h1>
          <p className='text-zinc-400 hover:text-white cursor-pointer'>About</p>
          <p className='text-zinc-400 hover:text-white cursor-pointer'>Jobs</p>
          <p className='text-zinc-400 hover:text-white cursor-pointer'>For the Record</p>
        </div>
        <div className='leading-[2.5]'>
          <h1 className='font-extrabold'>Communities</h1>
          <p className='text-zinc-400 hover:text-white cursor-pointer'>For Artists</p>
          <p className='text-zinc-400 hover:text-white cursor-pointer'>Developers</p>
          <p className='text-zinc-400 hover:text-white cursor-pointer'>Advertising</p>
          <p className='text-zinc-400 hover:text-white cursor-pointer'>Investors</p>
        </div>
        <div className='leading-[2.5]'>
          <h1 className='font-extrabold'>Useful Links</h1>
          <p className='text-zinc-400 hover:text-white cursor-pointer'>Support</p>
          <p className='text-zinc-400 hover:text-white cursor-pointer'>Free Mobile App</p>
        </div>
        <div className='leading-[2.5]'>
          <h1 className='font-extrabold'>Spotify Plans</h1>
          <p className='text-zinc-400 hover:text-white cursor-pointer'>Premium Individual</p>
          <p className='text-zinc-400 hover:text-white cursor-pointer'>Premium Duo</p>
          <p className='text-zinc-400 hover:text-white cursor-pointer'>Premium Family</p>
          <p className='text-zinc-400 hover:text-white cursor-pointer'>Spotify Free</p>
        </div>
      </div>
      <hr className='border-zinc-700' />
      <div className='flex justify-between pt-5 px-6 items-center flex-wrap gap-2'>
        <div className='flex flex-wrap gap-4 text-zinc-400 text-sm'>
          <span className='hover:text-white cursor-pointer'>Legal</span>
          <span className='hover:text-white cursor-pointer'>Privacy Policy</span>
          <span className='hover:text-white cursor-pointer'>Cookies</span>
          <span className='hover:text-white cursor-pointer'>About Ads</span>
          <span className='hover:text-white cursor-pointer'>Accessibility</span>
        </div>
        <span className='text-zinc-400 text-sm'>© {new Date().getFullYear()} Spotify AB</span>
      </div>
    </div>
  )
}

export default Footer