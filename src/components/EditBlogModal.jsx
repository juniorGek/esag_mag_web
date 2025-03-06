import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API_URL } from '../../config/ApiUrl';
import { toast } from 'react-toastify';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

export default function EditBlogModal({ isOpen, onClose, blog, onSave }) {
  const [editedBlog, setEditedBlog] = useState(blog || {
    titre: '',
    sous_titre: '',
    details: '',
    enabled: true
  });
  const [imageFile, setImageFile] = useState(null);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      StarterKit.configure({
        strike: false,
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
      }),
    ],
    content: blog?.details || '',
  });

  useEffect(() => {
    if (blog) {
      setEditedBlog(blog);
      editor?.commands.setContent(blog.details || '');
    }
  }, [blog, editor]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedBlog({
      ...editedBlog,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('L\'image ne doit pas dépasser 5MB');
        return;
      }
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Ajouter les données du blog
      Object.keys(editedBlog).forEach(key => {
        if (key !== 'imageCover') {
          formData.append(key, editedBlog[key]);
        }
      });

      // Ajouter le contenu de l'éditeur
      formData.append('details', editor.getHTML());

      // Ajouter la nouvelle image si elle existe
      if (imageFile) {
        formData.append('imageCover', imageFile);
      }

      const response = await fetch(`${API_URL}/updateBlog/${editedBlog.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (response.status === 200) {
        toast.success('Blog mis à jour avec succès');
        onSave();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la mise à jour du blog');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-4xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-6">
          Modifier le blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Titre
              </label>
              <input
                type="text"
                name="titre"
                value={editedBlog.titre}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-50 dark:border-slate-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Sous-titre
              </label>
              <input
                type="text"
                name="sous_titre"
                value={editedBlog.sous_titre}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-50 dark:border-slate-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Image de couverture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-50 dark:border-slate-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Contenu
            </label>
            <div className="min-h-[200px] border border-gray-300 rounded-lg p-4 dark:bg-slate-700 dark:border-slate-600">
              {editor?.options.element}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="enabled"
              checked={editedBlog.enabled}
              onChange={handleChange}
              className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700 dark:text-slate-300">
              Activer le blog
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditBlogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titre: PropTypes.string.isRequired,
    sous_titre: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
};

EditBlogModal.defaultProps = {
  blog: null,
};