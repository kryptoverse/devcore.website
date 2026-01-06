'use client'
import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Logo from '../../layout/header/Logo'
import toast from 'react-hot-toast'
import Loader from '../../shared/loader'
import Link from 'next/link'

const ResetPassword = () => {
    const router = useRouter()
    const { token } = useParams()

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const validatePassword = (password: string) => {
        if (password.length < 6) return 'Password must be at least 6 characters'
        return ''
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            toast.error("Passwords do not match")
            return
        }

        const passwordError = validatePassword(formData.password)
        if (passwordError) {
            setError(passwordError)
            toast.error(passwordError)
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`http://localhost:5000/api/v1/auth/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: formData.password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Reset failed');
            }

            toast.success("Password reset successfully!");
            router.push('/signin');
        } catch (error: any) {
            setError(error.message || "Something went wrong")
            toast.error(error.message || "Something went wrong")
        } finally {
            setLoading(false)
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
                                    Reset Password
                                </h3>
                                <p className='mb-8 text-dark_black/70 dark:text-white/60'>
                                    Enter your new password below.
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className='mb-5 text-left'>
                                        <input
                                            type='password'
                                            placeholder='New Password'
                                            name='password'
                                            value={formData.password}
                                            onChange={handleChange}
                                            className='w-full rounded-full border px-5 py-3 outline-hidden transition dark:border-white/20 dark:focus:border-white/50 focus:border-opacity-50 dark:focus:border-opacity-50 dark:bg-black/40 focus:border-dark_black'
                                        />
                                    </div>
                                    <div className='mb-5 text-left'>
                                        <input
                                            type='password'
                                            placeholder='Confirm Password'
                                            name='confirmPassword'
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className='w-full rounded-full border px-5 py-3 outline-hidden transition dark:border-white/20 dark:focus:border-white/50 focus:border-opacity-50 dark:focus:border-opacity-50 dark:bg-black/40 focus:border-dark_black'
                                        />
                                        {error && (
                                            <p className='text-red-500 text-sm mt-1'>
                                                {error}
                                            </p>
                                        )}
                                    </div>

                                    <div className='mb-6'>
                                        <button
                                            type='submit'
                                            disabled={loading}
                                            className='flex w-full px-5 py-3 font-medium cursor-pointer items-center justify-center transition duration-300 ease-in-out rounded-full border border-dark_black bg-dark_black hover:bg-white dark:hover:bg-white/20 dark:bg-white text-white dark:hover:text-white hover:text-dark_black dark:text-dark_black disabled:opacity-70'>
                                            {loading ? <Loader /> : 'Reset Password'}
                                        </button>
                                    </div>
                                </form>
                                <p className='text-dark_black/70 dark:text-white/50'>
                                    Remembered your password?{' '}
                                    <Link
                                        href='/signin'
                                        className='text-dark_black dark:text-white dark:hover:text-white/50 hover:underline'>
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword
