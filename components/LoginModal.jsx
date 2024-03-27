"use client";
import { useState, useEffect } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import GoogleIcon from '@mui/icons-material/Google';
import Error from './Error';
import validator from 'validator'

const LoginModal = ({ visible, setVisible }) => {
    if (!visible) return null;
    const [signUp, setSignUp] = useState(false);
    const [error, setError]= useState(null);
    const [providers, setProviders] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();

    }, [])
    async function handleSubmit(e){
        e.preventDefault();
        if(!validator.isEmail(email)){
            setError("Email not valid");
            return;
        }
        setEmail(validator.escape(email));
        setPassword(validator.escape(password));
        setCpassword(validator.escape(cpassword));
        if(signUp){
            if(password!==cpassword){
                setError("Passwords Didn't Match")
                 return;
            }
            const result = await signIn('credentials', { redirect:false, email:email, password:password, signUp:'on' });
            if(result.error){
                setError("User Already Exists");
                return;
            }
        }else{
            const result = await signIn('credentials', { redirect:false, email:email, password:password });
            if(result.error){
                setError("Wrong user credentials");
                return;
            }
        }
        setVisible(false);
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10'>
            <div className='md:w-[350px] w-[90%]'>
                <div className='bg-white flex flex-col p-2 rounded'>
                    <button role='button' className='text-black text-xl place-self-end pe-3 py-1' onClick={() => { setVisible(false) }}>X</button>
                    {error&&<Error err={error} setError={setError}/>}
                    <div className="p-3 flex justify-center items-center ">
                        <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
                            <h2 className='text-center text-3xl font-semibold my-3 orange_gradient'>{signUp ? "Sign Up" : "Login"}</h2>
                            <div className='p-2 w-full'>
                                <label htmlFor="email" className='orange_gradient' >Email</label>
                                <input type="email" onChange={(e)=>setEmail(e.target.value)} className='h-8 w-full rounded-md border border-slate-300 text-sm bg-transparent pl-2' />
                            </div>
                            <div className='p-2'>
                                <label htmlFor="password" className='orange_gradient' >Password</label>
                                <input type="password" onChange={(e)=>setPassword(e.target.value)} className='h-8 w-full rounded-md border border-slate-300 text-sm bg-transparent pl-2' />
                            </div>
                            {signUp && (
                                <div className='p-2'>
                                    <label htmlFor="password" className='orange_gradient' >Confirm Password</label>
                                    <input type="password" onChange={(e)=>setCpassword(e.target.value)} className='h-8 w-full rounded-md border border-slate-300 text-sm bg-transparent pl-2' />
                                </div>
                            )}
                            <button className='black_btn my-5'>{signUp ? "Sign Up" : "Login"}</button>
                            <p className='text-center'>Haven't registered yet <button type='button' className='text-blue-700' onClick={() => { setSignUp((prev) => !prev) }}>{signUp ? "Login" : "Sign Up"}</button></p>
                            <div className='flex justify-center items-center m-2 p-2'>
                                <hr className='w-[50%] mx-2' />OR<hr className='w-[50%] mx-2' />
                            </div>
                            <div className='flex flex-col'>
                                {providers && Object.values(providers).map((provider) =>{
                                    if(provider.name==='Credentials') return null;
                                    return(
                                        <button
                                            type="button"
                                            key={provider.name}
                                            onClick={() => { signIn(provider.id); setVisible(false) }}
                                            className="black_btn"
                                        >
                                            <GoogleIcon className="p-1 ps-0 me-0.5" />
                                            Sign In
                                        </button>
                                    )
                                })}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal