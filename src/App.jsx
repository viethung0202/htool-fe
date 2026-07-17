import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/context/ThemeContext'
import { MainLayout } from '@/layouts/MainLayout'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { Profile } from '@/pages/Profile'
import { VideoTool } from '@/pages/tools/VideoTool'
import { TasksTool } from '@/pages/tools/TasksTool'
import { BoardDetail } from '@/pages/tools/BoardDetail'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tools/video" element={<VideoTool />} />
              <Route path="/tools/tasks" element={<TasksTool />} />
              <Route path="/tools/tasks/:boardId" element={<BoardDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
