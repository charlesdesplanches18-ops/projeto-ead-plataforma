import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Module } from '../../types';
import { Plus, Edit2, Trash2, X, Save, ArrowLeft, Lock, Unlock, Video, FileText, HelpCircle } from 'lucide-react';
import clsx from 'clsx';

export const AdminModulos = () => {
  const { cursoId } = useParams<{ cursoId: string }>();
  const { courses, modules, addModule, updateModule, deleteModule } = useStore();

  const course = courses.find(c => c.id === cursoId);
  const courseModules = modules.filter(m => m.courseId === cursoId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Module>>({
    title: '',
    description: '',
    videoUrl: '',
    pdfUrl: '',
    activityDescription: '',
    isLocked: false,
    courseId: cursoId
  });

  if (!course) {
    return <div>Curso não encontrado.</div>;
  }

  const resetForm = () => {
    setFormData({ 
      title: '', description: '', videoUrl: '', pdfUrl: '', 
      activityDescription: '', isLocked: false, courseId: cursoId 
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (modulo: Module) => {
    setFormData(modulo);
    setEditingId(modulo.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este módulo?')) {
      deleteModule(id);
    }
  };

  const toggleLock = (modulo: Module) => {
    updateModule(modulo.id, { isLocked: !modulo.isLocked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateModule(editingId, formData);
    } else {
      addModule(formData as Omit<Module, 'id'>);
    }
    resetForm();
  };

  return (
    <div className="space-y-6">
      <Link to="/admin/cursos" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Voltar para Cursos
      </Link>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Módulos: {course.title}</h1>
          <p className="text-gray-600 mt-1">Gerencie os conteúdos, vídeos e materiais deste curso.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-gray-900 font-bold rounded-md hover:bg-green-500 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Novo Módulo
        </button>
      </div>

      <div className="space-y-4">
        {courseModules.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500">Nenhum módulo cadastrado. Clique em "Novo Módulo" para começar.</p>
          </div>
        ) : (
          courseModules.map((modulo, index) => (
            <div key={modulo.id} className={clsx(
              "bg-white rounded-xl shadow-sm border p-5 flex flex-col md:flex-row gap-4 transition-colors",
              modulo.isLocked ? "border-gray-200 bg-gray-50" : "border-gray-200"
            )}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={clsx("text-lg font-bold", modulo.isLocked ? "text-gray-500" : "text-gray-900")}>
                    Módulo {index + 1}: {modulo.title}
                  </h3>
                  {modulo.isLocked && (
                    <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Lock className="h-3 w-3" /> Bloqueado
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">{modulo.description}</p>
                
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    <Video className="h-4 w-4" /> Vídeo configurado
                  </span>
                  {modulo.pdfUrl && (
                    <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      <FileText className="h-4 w-4" /> PDF anexado
                    </span>
                  )}
                  {modulo.activityDescription && (
                    <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded">
                      <HelpCircle className="h-4 w-4" /> Atividade
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 md:border-l md:border-gray-200 md:pl-4">
                <button
                  onClick={() => toggleLock(modulo)}
                  className={clsx(
                    "p-2 rounded-md transition-colors flex flex-col items-center justify-center w-12 h-12",
                    modulo.isLocked 
                      ? "text-gray-500 hover:text-green-600 hover:bg-green-50" 
                      : "text-green-600 hover:text-gray-500 hover:bg-gray-100"
                  )}
                  title={modulo.isLocked ? "Desbloquear para alunos" : "Bloquear para alunos"}
                >
                  {modulo.isLocked ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => handleEdit(modulo)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors w-12 h-12 flex items-center justify-center"
                  title="Editar Módulo"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(modulo.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors w-12 h-12 flex items-center justify-center"
                  title="Excluir Módulo"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Editar Módulo' : 'Novo Módulo'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título do Módulo *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
                  placeholder="Ex: Introdução e Normas Regulamentadoras"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Curta *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600 resize-none"
                  placeholder="O que o aluno aprenderá neste módulo?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL do Vídeo (MP4, YouTube embed, etc) *</label>
                <input
                  type="url"
                  required
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
                  placeholder="https://exemplo.com/video.mp4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Apostila PDF (Opcional)</label>
                <input
                  type="url"
                  value={formData.pdfUrl}
                  onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
                  placeholder="https://exemplo.com/apostila.pdf"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Atividade Simples (Opcional)</label>
                <textarea
                  rows={2}
                  value={formData.activityDescription}
                  onChange={(e) => setFormData({ ...formData, activityDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600 resize-none"
                  placeholder="Ex: Descreva quais os 3 principais EPIs que você aprendeu..."
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isLocked"
                  checked={formData.isLocked}
                  onChange={(e) => setFormData({ ...formData, isLocked: e.target.checked })}
                  className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
                />
                <label htmlFor="isLocked" className="text-sm text-gray-700">
                  Manter este módulo bloqueado para os alunos por enquanto
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-gray-900 rounded-md hover:bg-green-500 font-bold"
                >
                  <Save className="h-4 w-4" />
                  Salvar Módulo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
