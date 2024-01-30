import { app} from "./app";
import { Env } from "./env";

app.listen({
  host: '0.0.0.0',
  port: Env.data.PORT
}).then(()=>{
  console.log('⚠️ Server is running')
})