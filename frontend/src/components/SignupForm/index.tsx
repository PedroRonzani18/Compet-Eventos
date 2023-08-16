'use client'
import { handleSignup } from "@/lib/createUser";
import { Box, Button, TextInput } from "@codelife-ui/react";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useRef } from "react";

export function SignupForm() {
  const navigation = useRouter()
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const handleSubmit = useCallback(async(e:FormEvent)=>{
    e.preventDefault();
    const nomeRef=nameRef.current
    const mailRef=emailRef.current
    const passRef=passwordRef.current
    const confRef=confirmRef.current
    if(confRef){
      if(passRef?.value!==confRef.value){
        alert("As senhas não coincidem")
        return
      }
    }
    if(!nomeRef?.value || !mailRef?.value || !passRef?.value){
      alert("Preencha todos os campos")
      return
    }
    if(passRef.value.length<8){
      alert("A senha deve ter no mínimo 8 caracteres")
      return
    }
    const res = await handleSignup({email:mailRef.value,password:passRef.value,name:nomeRef.value})
    if(res.ok){
      alert("Usuário cadastrado com sucesso")
      return navigation.push('/login')
    }
  },[nameRef,emailRef, passwordRef, confirmRef,navigation])
  return ( 
    <div className="flex flex-col items-center h-[100vh] justify-center">
      <Box
      as="form"
      className="w-[40%] flex flex-col justify-center items-center gap-4 bg-img-bg-compet bg-cover bg-center"
      onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold text-white">Cadastre-se</h1>
        <label className="flex-1 w-[80%] text-white">
          Nome
        <TextInput ref={nameRef} placeholder="Insira seu nome" type="text"/>
        </label>
        <label className="flex-1 w-[80%] text-white">
          Email
        <TextInput ref={emailRef} placeholder="Insira seu email" type="email"/>
        </label>
        <label className="flex-1 w-[80%] text-white">
          Senha
        <TextInput ref={passwordRef} placeholder="Insira sua senha" type="password"/>
        </label>
        <label className="flex-1 w-[80%] text-white">
          Confirmar Senha
        <TextInput ref={confirmRef} placeholder="Confirme sua senha" type="password"/>
        </label>
        <Button type="submit" variant="tertiary"> Cadastrar Usuário</Button>
      </Box>
    </div>
  );
;
}