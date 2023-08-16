interface handleSignupProps{
  email:string
  name:string
  password:string
}
export const handleSignup = async ({email,name,password}:handleSignupProps)=>{
  const url = "http://localhost:3000/api/user/create"; // Use the API route instead of the direct URL
  const body = JSON.stringify({email,name,password});
  const response = await fetch(url,{
    body: body,
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    }
  })
  return response;
}