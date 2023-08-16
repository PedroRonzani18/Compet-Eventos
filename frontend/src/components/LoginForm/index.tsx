'use client'
import { handleLogin } from "@/lib/useLogin";
import { Box, Button, TextInput } from "@codelife-ui/react";
import { FormEvent, useCallback, useRef } from "react";

export function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = useCallback(async(e:FormEvent)=>{
    e.preventDefault();
    const mailRef=emailRef.current
    if(mailRef){
      await handleLogin({email:mailRef.value})
    }
  },[emailRef])
  return ( 
    <div className="flex flex-col items-center h-[100vh] justify-center">
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