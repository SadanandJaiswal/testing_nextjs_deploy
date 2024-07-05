"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex items-center gap-2">
      <div className="flex items-center">
        <span className="text-2xl font-bold text-indigo-600">Quiz</span>
        <span className="text-2xl font-bold text-yellow-500">App</span>
      </div>
    </Link>
    {/* <Link href="/" className="flex gap-2 flex-center">
      <Image
        src="/assets/images/logo.svg"
        alt="logo"
        width={30}
        height={30}
        className="object-contain"
      />
      <p className="logo_text">Promptopia</p>
    </Link> */}

    {/* Desktop Navigation */}
    <div className="sm:flex hidden">
      {session?.user ? (
        <div className="flex gap-3 md:gap-5">
          <Link href="/" className="black_btn">
            Home
          </Link>
          <Link href="/quizzes" className="black_btn">
            Quizzes
          </Link>

          <button type="button" onClick={signOut} className="outline_btn">
            Sign Out
          </button>

          <Link href="/profile">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            />
          </Link>
        </div>
      ) : (
        <>
          <Link href="/" className="black_btn">
            Home
          </Link>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="black_btn ml-4"
              >
                Sign in
              </button>
            ))}
        </>
      )}
    </div>

    {/* Mobile Navigation */}
    <div className="sm:hidden flex relative">
      {session?.user ? (
        <div className="flex">
          <Image
            src={session?.user.image}
            width={37}
            height={37}
            className="rounded-full"
            alt="profile"
            onClick={() => setToggleDropdown(!toggleDropdown)}
          />

          {toggleDropdown && (
            <div className="dropdown">
              <Link
                href="/profile"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                My Profile
              </Link>
              <Link
                href="/quizzes"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Quizzes
              </Link>
              <button
                type="button"
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
                className="mt-5 w-full black_btn"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="black_btn"
              >
                Sign in
              </button>
            ))}
        </>
      )}
    </div>
  </nav>
  );
};

export default Nav;
