import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function authDevMiddleware(): Plugin {
  return {
    name: 'auth-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/auth/send-otp')) {
          try {
            const mod = await import('./api/auth/send-otp.ts');
            await mod.default(req, res);
          } catch (e) {
            console.error('Dev auth error (send-otp):', e);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: 'Internal dev server error' }));
          }
          return;
        }
        if (req.url?.startsWith('/api/auth/verify-otp')) {
          try {
            const mod = await import('./api/auth/verify-otp.ts');
            await mod.default(req, res);
          } catch (e) {
            console.error('Dev auth error (verify-otp):', e);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: 'Internal dev server error' }));
          }
          return;
        }
        if (req.url?.startsWith('/api/auth/session')) {
          try {
            const mod = await import('./api/auth/session.ts');
            await mod.default(req, res);
          } catch (e) {
            console.error('Dev auth error (session):', e);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: 'Internal dev server error' }));
          }
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), authDevMiddleware()],
})

