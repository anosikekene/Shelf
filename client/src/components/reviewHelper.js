export async function refreshReviews(user, setReviews) {
  try {
    const res = await fetch(`/api/users/${user}/reviews`);
    const data = await res.json();
    setReviews(data);
  } catch (err) {
    console.error("Failed to refresh reviews:", err);
  }
}
