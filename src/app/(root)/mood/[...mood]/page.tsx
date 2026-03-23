export default async function Page(props: {
  params: Promise<{ mood: string }>;
}) {
  const params = await props.params;
  return <div>My Post{params.mood}</div>;
}
