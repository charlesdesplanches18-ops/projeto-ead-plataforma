import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudentLayout } from './components/layout/StudentLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/student/Dashboard';
import { CoursePage } from './pages/student/CoursePage';
import { ModulePage } from './pages/student/ModulePage';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminAlunos } from './pages/admin/Alunos';
import { AdminCursos } from './pages/admin/Cursos';
import { AdminModulos } from './pages/admin/Modulos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas do Aluno */}
        <Route path="/aluno" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="curso/:cursoId" element={<CoursePage />} />
          <Route path="modulo/:moduloId" element={<ModulePage />} />
        </Route>

        {/* Rotas do Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="alunos" element={<AdminAlunos />} />
          <Route path="cursos" element={<AdminCursos />} />
          <Route path="cursos/:cursoId/modulos" element={<AdminModulos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
