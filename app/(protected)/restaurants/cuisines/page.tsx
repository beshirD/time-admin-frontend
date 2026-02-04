import { Cuisine } from "@/types/entities";
import { CuisinesContent } from "./_components/CuisinesContent";

async function getData(): Promise<Cuisine[]> {
  // Mock data for cuisines
  return [
    {
      id: 1,
      title: "Italian",
      stateId: "Active",
      createdOn: "01-Feb-2026 10:30",
    },
    {
      id: 2,
      title: "Chinese",
      stateId: "Active",
      createdOn: "01-Feb-2026 11:15",
    },
    {
      id: 3,
      title: "Mexican",
      stateId: "Active",
      createdOn: "01-Feb-2026 14:20",
    },
    {
      id: 4,
      title: "Japanese",
      stateId: "Active",
      createdOn: "02-Feb-2026 09:45",
    },
    {
      id: 5,
      title: "Indian",
      stateId: "Active",
      createdOn: "02-Feb-2026 13:10",
    },
    {
      id: 6,
      title: "Thai",
      stateId: "Active",
      createdOn: "02-Feb-2026 15:30",
    },
    {
      id: 7,
      title: "French",
      stateId: "Active",
      createdOn: "03-Feb-2026 08:00",
    },
    {
      id: 8,
      title: "Mediterranean",
      stateId: "Active",
      createdOn: "03-Feb-2026 10:25",
    },
    {
      id: 9,
      title: "American",
      stateId: "Inactive",
      createdOn: "03-Feb-2026 12:40",
    },
    {
      id: 10,
      title: "Korean",
      stateId: "Active",
      createdOn: "03-Feb-2026 14:55",
    },
  ];
}

export default async function CuisinesPage() {
  const data = await getData();

  return (
    <div className="w-full space-y-5 mb-7">
      <CuisinesContent initialData={data} />
    </div>
  );
}
