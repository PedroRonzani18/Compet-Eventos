interface handleLoginProps{
  email:string
  password:string
}
export const handleLogin = async ({email,password}:handleLoginProps)=>{
  const url = "http://localhost:3000/api/user/login"; // Use the API route instead of the direct URL
  const body = JSON.stringify({email,password});

  const response = await fetch(url,{
    body: body,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response;
}