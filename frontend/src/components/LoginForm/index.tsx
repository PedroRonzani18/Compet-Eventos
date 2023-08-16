'use client'
import { handleLogin } from "@/lib/useLogin";
import { Box, Button, TextInput } from "@codelife-ui/react";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigation = useRouter()
  const handleSubmit = useCallback(async(e:FormEvent)=>{
    e.preventDefault();
    const mailRef=emailRef.current
    const passRef = passwordRef.current
    if(mailRef&&passRef){
    const res= await handleLogin({email:mailRef.value,password:passRef.value})
      if(res.ok){
      return navigation.push('/dashboard')
      }
      if(res.status>=400){
        const error:{error_message:string} = await res.json()
        toast.error(error.error_message);
      }
    }
  },[emailRef,passwordRef,navigation])
  return ( 
    <div className="flex flex-col items-center h-[100vh] justify-center">
      <ToastContainer/>
      <Box
      as="form"
      className="w-[40%] flex flex-col justify-center items-center gap-4 bg-img-bg-compet bg-cover bg-center"
      onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold text-white">Efetue seu login</h1>
        <label className="flex-1 w-[80%] text-white">
          Email
        <TextInput ref={emailRef} placeholder="Insira seu email" type="email"/>
        </label>
        <label className="flex-1 w-[80%] text-white">
          Senha
        <TextInput ref={passwordRef} placeholder="Insira sua senha" type="password"/>
        </label>
        <p className="text-white">Não tem uma conta? <a href="/signup" className="text-blue-500">Cadastre-se</a></p>
        <Button type="submit" variant="tertiary"> Efetuar login</Button>
      </Box>
    </div>
  );
;
}