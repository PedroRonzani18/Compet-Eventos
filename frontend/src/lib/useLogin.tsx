interface handleLoginProps{
  email:string
  password:string
}
export const handleLogin = async ({email,password}:handleLoginProps)=>{
  const url = "http://localhost:4444/api/user/login"; // Use the API route instead of the direct URL
  const response = await fetch(url,{
    body: JSON.stringify({email,password}),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":"*"
    },
    mode:"no-cors"
  })
  return response;
}