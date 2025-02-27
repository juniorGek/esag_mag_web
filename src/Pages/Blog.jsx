import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogs as initialBlogs } from '../data';

const CURRENT_USER_ID = 'user123'; // Simuler un utilisateur connecté

const Blog = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showComments, setShowComments] = useState({});
  const [newComments, setNewComments] = useState({});

  const handleLike = (blogId, e) => {
    e.stopPropagation();
    const blog = blogs.find(b => b.id === blogId);
    if (!blog || blog.likedBy.includes(CURRENT_USER_ID)) return;

    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === blogId
          ? { 
              ...blog, 
              likes: blog.likes + 1,
              likedBy: [...blog.likedBy, CURRENT_USER_ID]
            }
          : blog
      )
    );
  };

  const handleSubmitComment = (blogId, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!newComments[blogId]?.trim()) return;

    const newComment = {
      id: Date.now(),
      user: "Utilisateur actuel",
      content: newComments[blogId],
      date: new Date().toLocaleDateString('fr-FR')
    };

    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === blogId
          ? { ...blog, comments: [...blog.comments, newComment] }
          : blog
      )
    );

    setNewComments(prev => ({
      ...prev,
      [blogId]: ''
    }));
  };

  const handleShare = async (blog, e) => {
    e.stopPropagation();
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

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog.id === selectedBlog?.id ? null : blog);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Blog ESAG</h1>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleBlogClick(blog)}
                className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="p-4">
                  {blog.image && (
                    <div className="relative aspect-[16/9] mb-4 rounded-md overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={blog.author.avatar}
                      alt="ESAG"
                      className="w-8 h-8 object-contain"
                    />
                    <div>
                      <h3 className="font-medium text-sm text-blue-600">{blog.author.name}</h3>
                      <p className="text-xs text-gray-500">{blog.date}</p>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold mb-2 line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {blog.content}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={(e) => handleLike(blog.id, e)}
                        className={`flex items-center gap-1 ${
                          blog.likedBy.includes(CURRENT_USER_ID) 
                            ? 'text-red-500' 
                            : 'text-gray-600 hover:text-red-500'
                        }`}
                        disabled={blog.likedBy.includes(CURRENT_USER_ID)}
                      >
                        <svg className="w-4 h-4" fill={blog.likedBy.includes(CURRENT_USER_ID) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{blog.likes}</span>
                      </button>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowComments(prev => ({
                            ...prev,
                            [blog.id]: !prev[blog.id]
                          }));
                        }}
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <span>{blog.comments.length}</span>
                      </button>

                      <button 
                        onClick={(e) => handleShare(blog, e)}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <AnimatePresence>
            {selectedBlog && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedBlog(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="p-6">
                    {selectedBlog.image && (
                      <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                        <img
                          src={selectedBlog.image}
                          alt={selectedBlog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={selectedBlog.author.avatar}
                        alt="ESAG"
                        className="w-12 h-12 object-contain"
                      />
                      <div>
                        <h3 className="font-semibold text-blue-600">{selectedBlog.author.name}</h3>
                        <p className="text-sm text-gray-500">{selectedBlog.date}</p>
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-4">
                      {selectedBlog.title}
                    </h2>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {selectedBlog.content}
                    </p>

                    <div className="flex items-center justify-between border-t border-b py-4 mb-6">
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={(e) => handleLike(selectedBlog.id, e)}
                          className={`flex items-center gap-2 ${
                            selectedBlog.likedBy.includes(CURRENT_USER_ID) 
                              ? 'text-red-500' 
                              : 'text-gray-600 hover:text-red-500'
                          }`}
                          disabled={selectedBlog.likedBy.includes(CURRENT_USER_ID)}
                        >
                          <svg className="w-6 h-6" fill={selectedBlog.likedBy.includes(CURRENT_USER_ID) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{selectedBlog.likes}</span>
                        </button>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowComments(prev => ({
                              ...prev,
                              [selectedBlog.id]: !prev[selectedBlog.id]
                            }));
                          }}
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          <span>{selectedBlog.comments.length}</span>
                        </button>

                        <button 
                          onClick={(e) => handleShare(selectedBlog, e)}
                          className="text-gray-600 hover:text-blue-600"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg mb-4">Commentaires</h3>
                      {selectedBlog.comments.map(comment => (
                        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <span className="font-medium">{comment.user}</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                          </div>
                          <p className="text-gray-600">{comment.content}</p>
                        </div>
                      ))}

                      <form onSubmit={(e) => handleSubmitComment(selectedBlog.id, e)} className="mt-6">
                        <textarea
                          value={newComments[selectedBlog.id] || ''}
                          onChange={(e) => setNewComments(prev => ({
                            ...prev,
                            [selectedBlog.id]: e.target.value
                          }))}
                          placeholder="Ajouter un commentaire..."
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          rows="3"
                        />
                        <button
                          type="submit"
                          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Commenter
                        </button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Blog;
