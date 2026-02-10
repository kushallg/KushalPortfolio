import { Link } from 'react-router-dom';
import { getAllPosts } from '@/utils/posts';
import './Writing.css';

function Writing() {
  // Get posts synchronously - no loading state needed!
  const posts = getAllPosts();

  // Group posts by year
  const postsByYear = posts.reduce((acc, post) => {
    if (!acc[post.year]) {
      acc[post.year] = [];
    }
    acc[post.year].push(post);
    return acc;
  }, {});

  // Sort years in descending order
  const years = Object.keys(postsByYear).sort((a, b) => b - a);

  // Format date to "Mon DD" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="writing-container">
      <h1 className="writing-title">Writing</h1>

      {years.map((year, yearIndex) => (
        <div key={year} className="writing-year-section">
          <div className="writing-year">{year}</div>
          <ul className="writing-posts-list">
            {postsByYear[year].map((post) => (
              <li key={post.slug} className="writing-post-item">
                <Link to={`/writing/${post.slug}`} className="writing-post-link">
                  <div className="writing-post-title">{post.title}</div>
                  <div className="writing-post-date">{formatDate(post.date)}</div>
                </Link>
              </li>
            ))}
          </ul>

          {yearIndex < years.length - 1 && <div className="writing-divider"></div>}
        </div>
      ))}
    </div>
  );
}

export default Writing;
