import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PasswordGenerator() {
    let [length, setLength] = useState(8);
    let [numAllowed, setNumAllowed] = useState(false);
    let [charAllowed, setCharAllowed] = useState(true);
    let [password, setPassword] = useState('');
    let [strength, setStrength] = useState('');

    // Generate random password
    function generateRandomPassword() {
        let pass = '';
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        let nums = '0123456789';
        let speChar = '@#$%^&*()><';
        
        if (numAllowed) chars += nums;
        if (charAllowed) chars += speChar;

        for (let i = 0; i < length; i++) {
            pass += chars[Math.floor(Math.random() * chars.length)];
        }
        setPassword(pass);
        evaluatePasswordStrength(pass);
    }

    // Evaluate password strength
    function evaluatePasswordStrength(pass) {
        let score = 0;

        if (pass.length >= 8) score += 1; 
        if (/[0-9]/.test(pass)) score += 1; 
        if (/[!@#$%^&*()><]/.test(pass)) score += 1; 
        if (/[A-Z]/.test(pass)) score += 1;

        if (score <= 1) {
            setStrength('Weak');
        } else if (score === 2) {
            setStrength('Fair');
        } else if (score === 3) {
            setStrength('Strong');
        } else {
            setStrength('Very Strong');
        }
    }

    // Copy password to clipboard and show toast notification
    function copyToClipboard() {
        navigator.clipboard.writeText(password).then(() => {
            toast.success('Password copied to clipboard!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch(err => {
            toast.error('Failed to copy password', {
                position: "top-center",
                autoClose: 3000,
            });
        });
    }

    useEffect(() => {
        generateRandomPassword();
    }, [length, numAllowed, charAllowed]);

    return (
        <div className=" bg-slate-800 p-3">
            <div className="bg-slate-300 rounded-lg max-w-sm mx-auto my-3 overflow-hidden p-4">
                <h1 className="text-center mb-3 text-red-800 font-mono text-2xl">
                    Password Generator
                </h1>
                <div className="flex mb-3">
                    <input
                        type="text"
                        value={password}
                        className="w-full rounded-md outline-none p-2 placeholder:text-gray-400"
                        readOnly
                        placeholder={password === '' ? "Password" : ""}
                    />
                    <button
                        className="bg-blue-800 text-white p-1 ml-2 text-center rounded-md"
                        onClick={copyToClipboard}
                    >
                        Copy
                    </button>
                </div>

                <div className="p-1">
                    <input
                        type="range"
                        id="passLength"
                        min={6}
                        max={20}
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    />
                    <label htmlFor="passLength">Length: {length}</label>
                </div>

                <div className="my-3">
                    <input
                        type="checkbox"
                        id="nums"
                        checked={numAllowed}
                        onChange={() => setNumAllowed((previousVal) => !previousVal)}
                    />
                    <label htmlFor="nums" className="px-1">
                        Numbers allowed
                    </label>
                    <input
                        type="checkbox"
                        id="chars"
                        checked={charAllowed}
                        onChange={() => setCharAllowed((previousVal) => !previousVal)}
                    />
                    <label htmlFor="chars" className="px-1">
                        Chars allowed
                    </label>
                </div>

                <div>
                    <button
                        className="bg-blue-800 text-center text-white rounded-lg px-2 py-1 block mx-auto my-3"
                        onClick={generateRandomPassword}
                    >
                        Generate password
                    </button>
                </div>

                <div className="text-center">
                    <p>Password Strength: <strong>{strength}</strong></p>
                </div>

                <div className="mt-6 p-4 bg-slate-100 rounded-md">
                    <h2 className="text-center font-bold text-lg">Important Note</h2>
                    <p className="text-sm text-center text-gray-600">
                        It's highly recommended to change your password every 2 weeks for better security.
                    </p>
                    <p className="text-sm text-center mt-2 text-gray-600">
                        Developed by <a href="https://github.com/mubashar-mizA" target='_blank' className="text-blue-800 underline"> Mubasahar Siddique.</a>
                    </p>
                </div>
            </div>

            {/* Toast notification */}
            <ToastContainer />
        </div>
    );
}
