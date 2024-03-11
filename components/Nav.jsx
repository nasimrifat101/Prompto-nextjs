'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import img from '../public/assets/images/logo.svg'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const isUserLogged = true
    const [providers, setProviders] = useState(null)
    const [dropDown, setDropDown] = useState(false)

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders()

            setProviders(response)
        }
        setProviders()
    }, [])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href={'/'} className='flex gap-2 flex-center'>
                <Image src={img} alt='Promptopia logo' width={30} height={30} className='object-contain'></Image>
                <p className="logo_text">Promptopia</p>
            </Link>

            {/* Desktop Nav */}
            <div className="sm:flex hidden">
                {
                    isUserLogged ?
                        <div className='flex gap-3 md:gap-5'>
                            <Link href={'/create-prompt'} className={'black_btn'}>
                                Create Post
                            </Link>
                            <button type='button' className='outline_btn' onClick={signOut}>
                                Sign Out
                            </button>
                            <Link href={'/profile'}>
                                <Image
                                    src={img}
                                    width={37}
                                    height={37}
                                    className='rounded-full'
                                    alt='profile'
                                />
                            </Link>
                        </div>
                        :
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                }
            </div>

            {/* Mobile navigation */}
            <div className='sm:hidden flex relative'>
                {
                    isUserLogged ?
                        <div className='flex'>
                            <Image
                                src={img}
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                                onClick={() => { setDropDown((prev) => { !prev }) }}
                            />
                            {
                                dropDown && (
                                    <div className='dropdown'>
                                        <Link href="/profile" className='dropdown_link' onClick={() => setDropDown(false)}>
                                            My Profile
                                        </Link>
                                        <Link href="/create-prompt" className='dropdown_link' onClick={() => setDropDown(false)}>
                                            Create Prompt
                                        </Link>
                                        <button type='button' onClick={() => {
                                            setDropDown(false)
                                            signOut()
                                        }} className='mt-5 w-full black_btn'>
                                            Sign Out
                                        </button>
                                    </div>

                                )
                            }
                        </div>
                        :
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                }
            </div>
        </nav>
    );
};

export default Nav;