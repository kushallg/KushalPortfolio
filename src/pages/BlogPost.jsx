import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '@/utils/posts';
import './BlogPost.css';

function BlogPost() {
  const { slug } = useParams();

  // Get post synchronously - instant!
  const post = getPostBySlug(slug);

  // If post doesn't exist, redirect
  if (!post) {
    return <Navigate to="/writing" replace />;
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="blog-post-container">
      {/* Back link */}
      <Link to="/writing" className="back-link">
        ← Back to Writing
      </Link>

      {/* Post header */}
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span>{formatDate(post.date)}</span>
        </div>
      </header>

      {/* Post content - rendered from Markdown */}
      <article className="post-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
}

export default BlogPost;
