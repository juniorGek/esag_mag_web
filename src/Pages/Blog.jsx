import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { blogs as initialBlogs } from '../data';

const CURRENT_USER_ID = 'user123'; // Simuler un utilisateur connecté

const Blog = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Blog ESAG</h1>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-4">
                  {blog.image && (
                    <div className="relative aspect-[16/9] mb-4 rounded-xl overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-10 h-10 rounded-full border-2 border-blue-100"
                    />
                    <div>
                      <h3 className="font-medium text-blue-600">{blog.author.name}</h3>
                      <p className="text-xs text-gray-500">{blog.date}</p>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2 group-hover:text-blue-600">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {blog.content}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
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
                        <svg className="w-5 h-5" fill={blog.likedBy.includes(CURRENT_USER_ID) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{blog.likes}</span>
                      </button>

                      <div className="flex items-center gap-1 text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <span>{blog.comments.length}</span>
                      </div>

                      <button 
                        onClick={(e) => handleShare(blog, e)}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
