import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Course } from '../../types';
import { Plus, Edit2, Trash2, X, Save, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminCursos = () => {
  const { courses, modules, addCourse, updateCourse, deleteCourse } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    description: '',
    imageUrl: ''
  });

  const resetForm = () => {
    setFormData({ title: '', description: '', imageUrl: '' });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (course: Course) => {
    setFormData(course);
    setEditingId(course.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este curso e todos os seus módulos?')) {
      deleteCourse(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCourse(editingId, formData);
    } else {
      addCourse(formData as Omit<Course, 'id'>);
    }
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Cursos</h1>
          <p className="text-gray-600 mt-1">Crie e edite os treinamentos disponíveis.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-gray-900 font-bold rounded-md hover:bg-green-500 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Novo Curso
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => {
          const courseModules = modules.filter(m => m.courseId === course.id);
          
          return (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              {course.imageUrl ? (
                <div className="h-40 w-full bg-gray-200">
                  <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-40 w-full bg-green-600 flex items-center justify-center">
                  <span className="text-green-900 font-bold text-lg">Sem Imagem</span>
                </div>
              )}
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Layers className="h-4 w-4" />
                    {courseModules.length} módulos
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="p-1.5 text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded transition-colors"
                      title="Editar Curso"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded transition-colors"
                      title="Excluir Curso"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <Link
                  to={`/admin/cursos/${course.id}/modulos`}
                  className="mt-4 block w-full text-center py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Gerenciar Módulos
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Editar Curso' : 'Novo Curso'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título do Curso *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
                  placeholder="Ex: Operador de Escavadeira"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Curta *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600 resize-none"
                  placeholder="Descreva o objetivo deste treinamento..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem de Capa (Opcional)</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
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
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
