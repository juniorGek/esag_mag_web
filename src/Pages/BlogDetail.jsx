import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs as initialBlogs } from '../data';

const CURRENT_USER_ID = 'user123';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const foundBlog = initialBlogs.find(b => b.id === parseInt(id));
    if (!foundBlog) {
      navigate('/blog');
      return;
    }
    setBlog(foundBlog);
  }, [id, navigate]);

  const handleLike = () => {
    if (!blog || blog.likedBy.includes(CURRENT_USER_ID)) return;

    setBlog(prevBlog => ({
      ...prevBlog,
      likes: prevBlog.likes + 1,
      likedBy: [...prevBlog.likedBy, CURRENT_USER_ID]
    }));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      user: "Utilisateur actuel",
      content: newComment,
      date: new Date().toLocaleDateString('fr-FR')
    };

    setBlog(prevBlog => ({
      ...prevBlog,
      comments: [...prevBlog.comments, newCommentObj]
    }));

    setNewComment('');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.content,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {blog.image && (
            <div className="relative h-[400px] w-full">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                <div className="flex items-center gap-4">
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                  <div>
                    <p className="font-medium">{blog.author.name}</p>
                    <p className="text-sm opacity-90">{blog.date}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-8">
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">{blog.content}</p>
            </div>

            <div className="flex items-center justify-between border-t border-b py-4 mb-8">
              <div className="flex items-center gap-6">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 ${
                    blog.likedBy.includes(CURRENT_USER_ID) 
                      ? 'text-red-500' 
                      : 'text-gray-600 hover:text-red-500'
                  }`}
                  disabled={blog.likedBy.includes(CURRENT_USER_ID)}
                >
                  <svg className="w-6 h-6" fill={blog.likedBy.includes(CURRENT_USER_ID) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{blog.likes}</span>
                </button>

                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span>{blog.comments.length}</span>
                </div>

                <button 
                  onClick={handleShare}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Commentaires</h3>
              <div className="space-y-4">
                {blog.comments.map(comment => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 p-4 rounded-xl"
                  >
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-900">{comment.user}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </motion.div>
                ))}
              </div>

              <form onSubmit={handleSubmitComment} className="mt-8">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                  className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  rows="3"
                />
                <button
                  type="submit"
                  className="mt-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Publier le commentaire
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail; 