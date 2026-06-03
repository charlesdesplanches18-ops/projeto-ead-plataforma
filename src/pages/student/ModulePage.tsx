import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ArrowLeft, CheckCircle, FileText, HelpCircle } from 'lucide-react';
import clsx from 'clsx';

export const ModulePage = () => {
  const { moduloId } = useParams<{ moduloId: string }>();
  const navigate = useNavigate();
  const { currentUser, modules, progress, markModuleCompleted } = useStore();

  const modulo = modules.find(m => m.id === moduloId);
  
  if (!modulo || modulo.isLocked) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Módulo indisponível</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-green-700 font-medium hover:underline">Voltar</button>
      </div>
    );
  }

  // Verifica se o aluno tem acesso ao curso deste módulo
  if (currentUser?.role === 'STUDENT' && currentUser.courseId !== modulo.courseId) {
    return <Navigate to="/aluno/dashboard" />;
  }

  const studentProgress = progress.find(p => p.studentId === currentUser?.id && p.courseId === modulo.courseId);
  const isCompleted = studentProgress?.completedModuleIds.includes(modulo.id) || false;

  const handleComplete = () => {
    if (currentUser && !isCompleted) {
      markModuleCompleted(currentUser.id, modulo.courseId, modulo.id);
      navigate(`/aluno/curso/${modulo.courseId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to={`/aluno/curso/${modulo.courseId}`} className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Voltar para o Curso
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Video Area */}
        <div className="aspect-video bg-gray-900 w-full relative">
          <video 
            className="w-full h-full object-cover"
            controls
            src={modulo.videoUrl}
            poster="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200"
          >
            Seu navegador não suporta vídeos.
          </video>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{modulo.title}</h1>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                  Módulo Concluído
                </span>
              )}
            </div>
            <p className="text-gray-600 text-lg">{modulo.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Materiais Complementares */}
            {modulo.pdfUrl && (
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2">
                  <FileText className="h-5 w-5" />
                  <h3>Material de Apoio</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Baixe a apostila em PDF com o conteúdo detalhado desta aula para estudar offline.
                </p>
                <a 
                  href={modulo.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors text-sm"
                >
                  Baixar Apostila (PDF)
                </a>
              </div>
            )}

            {/* Atividade */}
            {modulo.activityDescription && (
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                  <HelpCircle className="h-5 w-5" />
                  <h3>Atividade de Fixação</h3>
                </div>
                <p className="text-sm text-gray-800 font-medium bg-white p-3 rounded border border-gray-200 shadow-sm">
                  {modulo.activityDescription}
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  Pense sobre esta questão para debatermos no dia do treinamento prático.
                </p>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleComplete}
              disabled={isCompleted}
              className={clsx(
                "px-6 py-3 rounded-md font-bold flex items-center gap-2 transition-colors",
                isCompleted 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-green-600 hover:bg-green-700 text-white shadow-sm"
              )}
            >
              <CheckCircle className="h-5 w-5" />
              {isCompleted ? 'Módulo já concluído' : 'Marcar como Concluído'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
