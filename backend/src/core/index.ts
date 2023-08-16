import { app } from './app';
import { env } from './env';
import "@/core/db"

app.listen({
	host: '0.0.0.0',
	port: env.PORT,	
}).then(() => {
	console.log('HTTP Server Running');
});
