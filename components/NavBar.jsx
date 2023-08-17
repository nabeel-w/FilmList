'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import MovieIcon from '@mui/icons-material/Movie';
import LoginModal from "./LoginModal";


const NavBar = () => {
    const { data: isUserLoggedIn } = useSession();
    const [toggleDropdown, settoggleDropdown] = useState(false);
    const [visible, setVisible] = useState(null)

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo2.svg"
                    alt="FilmList Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">FilmList</p>
            </Link>
            {/*Desktop Navigation*/}
            <div className="sm:flex hidden">
                {isUserLoggedIn?.user ?
                    (
                        <div className="flex gap-3 md:gap-5">
                            <Link className="black_btn" href="/watchlist">
                                <MovieIcon className="mx-2"/>
                                Watchlist
                            </Link>
                            <button className="outline_btn me-2" type="button" onClick={signOut}>
                                Sign Out
                            </button>
                            <Link href="#">
                                <Image
                                    src={isUserLoggedIn?.user.image}
                                    width={37}
                                    height={37}
                                    className="rounded-full"
                                    alt="Profile Image"
                                />
                            </Link>
                        </div>
                    )
                    : (
                        <>

                            <button
                                type="button"
                                onClick={() => { setVisible(true) }}
                                // onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign In
                            </button>

                        </>
                    )}
            </div>
            {/*Mobile Navigation*/}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn?.user ? (
                    <div className="flex">
                        <Image
                            src={isUserLoggedIn?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="Profile Image"
                            onClick={() => settoggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                {/* <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => settoggleDropdown(false)}
                                >
                                    My Profile
                                </Link> */}
                                <Link
                                    href='/watchlist'
                                    className='dropdown_link'
                                    onClick={() => settoggleDropdown(false)}
                                >
                                    <MovieIcon className="mx-2"/>
                                    Watchlist
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        settoggleDropdown(false);
                                        signOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) :
                    (
                        <>
                            <button
                                type="button"
                                onClick={() => { setVisible(true) }}
                                className="black_btn"
                            >
                                Sign In
                            </button>
                        </>
                    )
                }
            </div>
            <LoginModal visible={visible} setVisible={setVisible} />
        </nav>
    )
}

export default NavBar;