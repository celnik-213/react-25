import { useState, useEffect } from "react";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Na start true, bo zaczynamy pobieranie
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then(res => {
        if (!res.ok) {
          throw new Error("Nie udało się pobrać danych");
        }
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Ładowanie…</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div>
      <h2>Lista postów</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}