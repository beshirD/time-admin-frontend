import AdvancesContent from "./_components/AdvancesContent";
import { mockAdvances, mockDrivers } from "./_components/mockData";

export default function DriverAdvancesPage() {
  return (
    <AdvancesContent
      initialAdvances={mockAdvances}
      drivers={mockDrivers}
    />
  );
}
