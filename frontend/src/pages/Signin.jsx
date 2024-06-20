import React, { useState } from 'react'
import axios from 'axios'

function Signin() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                <form>
                    <div className="mb-4">
                        <label HtmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <input type="email" id="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={(e) => { setemail(e.target.value) }} />
                    </div>
                    <div className="mb-4">
                        <label HtmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                        <input type="password" id="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={(e) => { setpassword(e.target.value) }} />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={async () => {

                            const response = await axios.post('https://compiler-backend-ten.vercel.app/user/signin',{
                                    email,
                                    password
                            }, {
                                    headers: {
                                        "Access-Control-Allow-Origin": "*",
                                        "Content-Type": "application/json",
                                    }
                                })
                            if (response.data.token) {
                                localStorage.setItem('token', response.data.token)
                                localStorage.setItem('user',response.data.username[0])
                                location.href='/'
                            }
                            else {
                                alert(response.data.message)
                            }
                        }}>Sign In</button>
                        <a href="/signup" className="text-blue-500 hover:underline">Register for new user?</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin