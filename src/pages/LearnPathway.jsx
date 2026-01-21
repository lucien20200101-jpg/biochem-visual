import { useParams } from "react-router-dom";

export default function LearnPathway() {
  const { pathwayId } = useParams();

  return (
    <section>
      <h1>Learn Pathway</h1>
      <p>Pathway details will appear here for: {pathwayId ?? "unknown"}.</p>
    </section>
  );
}
