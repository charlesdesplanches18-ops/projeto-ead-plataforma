import { useParams, Link, Navigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { PlayCircle, CheckCircle, Lock, ArrowLeft, FileText } from 'lucide-react';
import clsx from 'clsx';

export const CoursePage = () => {
  const { cursoId } = useParams<{ cursoId: string }>();
  const { currentUser, courses, modules, progress } = useStore();

  // Verifica se o aluno tem acesso a este curso
  if (currentUser?.role === 'STUDENT' && currentUser.courseId !== cursoId) {
    return <Navigate to="/aluno/dashboard" />;
  }

  const course = courses.find(c => c.id === cursoId);
  const courseModules = modules.filter(m => m.courseId === cursoId);
  const studentProgress = progress.find(p => p.studentId === currentUser?.id && p.courseId === cursoId);

  if (!course) return <Navigate to="/aluno/dashboard" />;

  const completedIds = studentProgress?.completedModuleIds || [];
  const progressPercent = courseModules.length > 0 
    ? Math.round((completedIds.length / courseModules.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <Link to="/aluno/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Voltar para Dashboard
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {course.imageUrl && (
          <div className="h-64 w-full bg-gray-200 relative">
            <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-6">
              <h1 className="text-3xl font-bold text-white">{course.title}</h1>
            </div>
          </div>
        )}
        
        <div className="p-6">
          {!course.imageUrl && (
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
          )}
          <p className="text-gray-600 text-lg mb-6">{course.description}</p>
          
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="text-gray-700 font-medium">Seu progresso neste curso</span>
                <span className="font-bold text-gray-900">{progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={clsx("h-2.5 rounded-full transition-all duration-500", progressPercent === 100 ? 'bg-green-500' : 'bg-green-600')} 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Módulos do Curso</h2>
        
        <div className="space-y-3">
          {courseModules.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhum módulo cadastrado neste curso ainda.</p>
          ) : (
            courseModules.map((modulo, index) => {
              const isCompleted = completedIds.includes(modulo.id);
              
              return (
                <Link
                  key={modulo.id}
                  to={modulo.isLocked ? '#' : `/aluno/modulo/${modulo.id}`}
                  className={clsx(
                    "flex items-center p-4 rounded-lg border transition-all",
                    modulo.isLocked 
                      ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-75" 
                      : "border-gray-200 hover:border-green-600 hover:shadow-md bg-white cursor-pointer"
                  )}
                >
                  <div className="mr-4 flex-shrink-0">
                    {modulo.isLocked ? (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <Lock className="h-5 w-5" />
                      </div>
                    ) : isCompleted ? (
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                        <PlayCircle className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={clsx("text-base font-semibold truncate", modulo.isLocked ? "text-gray-500" : "text-gray-900")}>
                      {index + 1}. {modulo.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate mt-0.5">{modulo.description}</p>
                  </div>
                  
                  <div className="ml-4 flex-shrink-0 flex items-center gap-2">
                    {modulo.pdfUrl && !modulo.isLocked && (
                      <span className="inline-flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                        <FileText className="h-3 w-3 mr-1" /> PDF
                      </span>
                    )}
                    {isCompleted && (
                      <span className="inline-flex items-center text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-md">
                        Concluído
                      </span>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
