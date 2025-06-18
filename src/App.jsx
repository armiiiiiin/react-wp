import React, { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const res = await fetch('https://your.wordpress.site/wp-json/wp/v2/posts?_embed&per_page=10');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        {posts.map(post => (
          <div
            key={post.id}
            style={styles.listItem}
            onClick={() => setSelected(post)}
          >
            <div style={styles.name}>{post.title.rendered}</div>
          </div>
        ))}
        {loading && <div style={styles.loader}>Loading…</div>}
      </div>
      <div style={styles.details}>
        {selected ? (
          <>
            <h2>{selected.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: selected.content.rendered }} />
          </>
        ) : (
          <p>Select a post to view details</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', height: '100vh', fontFamily: 'sans-serif' },
  sidebar: { width: '30%', overflowY: 'auto', padding: '20px', borderRight: '1px solid #ccc' },
  listItem: { padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' },
  name: { fontSize: '14px', fontWeight: 'bold' },
  details: { padding: '20px', width: '70%' },
  loader: { padding: '10px', fontStyle: 'italic' }
};

export default App;
