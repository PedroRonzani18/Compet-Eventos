interface handleLoginProps{
  email:string
}
export const handleLogin = async ({email}:handleLoginProps)=>{
  const url = "http://localhost:4444/test"; // Use the API route instead of the direct URL
  const response = await fetch(url,{
    body: JSON.stringify({email}),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":"*"
    },
    mode:"no-cors"
  })
  console.log(response)
  return response;
}