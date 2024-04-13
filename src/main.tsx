import ReactDOM from 'react-dom/client'
import './index.css'
import { CssBaseline } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { queryClient } from './config/react-query'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
    </QueryClientProvider>
  </>
)
