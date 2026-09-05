import EventCarousel from "@/components/events/EventCarousel";

export const metadata = {
  title: "Events | Innovision",
  description: "Explore the space-themed events of Innovision.",
};

export default function EventsPage() {
  return (
    <main className="bg-[#050914] min-h-screen text-white">
      <EventCarousel />
    </main>
  );
}
