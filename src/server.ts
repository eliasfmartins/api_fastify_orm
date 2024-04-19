import { app } from './app';

app
	.listen({
		host: '0.0.0.0',
		port: 3333,
	})
	.then(() => {
		console.log('HTTP Server Running!!');
	});

// npm i typescript @types/node tsx tsup -D comando pra instalar dependencias padrao
// npx tsc --init   criar arquivo de configuracoes typescript
