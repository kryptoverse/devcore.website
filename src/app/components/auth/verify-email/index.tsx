'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '../../layout/header/Logo'
import toast from 'react-hot-toast'
import Loader from '../../shared/loader'

const VerifyEmail = () => {
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const router = useRouter()

    useEffect(() => {
        // Get email from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                // Handle both "stringified object" and "result from signup" formats
                // Sometimes user might be { user: { email: ... } } or just { email: ... }
                const parsed = JSON.parse(storedUser);
                if (parsed.email) {
                    setEmail(parsed.email);
                } else if (parsed.user && parsed.user.email) {
                    setEmail(parsed.user.email);
                }
            } catch (e) {
                console.error("Failed to parse user from local storage");
            }
        }
    }, [])

    const handleChange = (index: number, value: string) => {
        const newCode = [...code]

        // Handle pasted code
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split('')
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || ''
            }
            setCode(newCode)
            // Focus on last filled input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '')
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
            inputRefs.current[focusIndex]?.focus()
        } else {
            newCode[index] = value
            setCode(newCode)

            // Auto-focus next input
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus()
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const verificationCode = code.join('')
        if (verificationCode.length !== 6) {
            toast.error("Please enter a 6-digit code")
            return
        }

        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/v1/auth/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Code: verificationCode }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Verification failed');
            }

            toast.success("Email verified successfully!");
            router.push('/signin');
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        if (!email) {
            toast.error("User email not found. Please sign up again.");
            return;
        }

        setResendLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/v1/auth/resend-verification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Resend failed');
            }

            toast.success("Verification code resent!");
        } catch (error: any) {
            toast.error(error.message || "Failed to resend code");
        } finally {
            setResendLoading(false)
        }
    }

    return (
        <section>
            <div className='relative w-full pt-44 2xl:pb-20 pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-blue_gradient before:via-white before:to-yellow_gradient before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10'>
                <div className='container'>
                    <div className='-mx-4 flex flex-wrap'>
                        <div className='w-full px-4'>
                            <div className='relative shadow-lg mx-auto max-w-md overflow-hidden rounded-lg bg-white dark:bg-dark_black px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-16'>
                                <div className='mb-10 flex justify-center'>
                                    <Logo />
                                </div>

                                <h3 className='mb-3 text-2xl font-bold text-dark_black dark:text-white'>
                                    Verify Your Email
                                </h3>
                                <p className='mb-8 text-dark_black/70 dark:text-white/60'>
                                    Enter the 6-digit code sent to {email ? email : 'your email'}.
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className='flex justify-center gap-2 mb-8'>
                                        {code.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => { inputRefs.current[index] = el }}
                                                type='text'
                                                maxLength={6}
                                                value={digit}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                className='w-12 h-12 text-center text-xl font-bold rounded-lg border border-stroke dark:border-white/20 dark:bg-black/40 focus:border-dark_black dark:focus:border-white outline-none transition'
                                            />
                                        ))}
                                    </div>

                                    <div className='mb-6'>
                                        <button
                                            type='submit'
                                            disabled={loading}
                                            className='flex w-full px-5 py-3 font-medium cursor-pointer items-center justify-center transition duration-300 ease-in-out rounded-full border border-dark_black bg-dark_black hover:bg-white dark:hover:bg-white/20 dark:bg-white text-white dark:hover:text-white hover:text-dark_black dark:text-dark_black disabled:opacity-70'>
                                            {loading ? <Loader /> : 'Verify Email'}
                                        </button>
                                    </div>
                                </form>

                                <div className='text-center'>
                                    <p className='text-dark_black/70 dark:text-white/50 text-sm'>
                                        Didn't receive the code?{' '}
                                        <button
                                            onClick={handleResend}
                                            disabled={resendLoading}
                                            className='text-dark_black dark:text-white font-medium hover:underline disabled:opacity-50'>
                                            {resendLoading ? 'Resending...' : 'Resend'}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VerifyEmail
