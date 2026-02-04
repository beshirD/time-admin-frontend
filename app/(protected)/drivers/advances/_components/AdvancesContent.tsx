"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { DriverAdvance, Driver } from "@/types/entities";
import { createColumns } from "./columns";
import AdvancesHeader from "./AdvancesHeader";
import AdvancesFilters from "./AdvancesFilters";
import AdvancesTable from "./AdvancesTable";
import CreateAdvanceModal from "./CreateAdvanceModal";
import SettlementModal from "./SettlementModal";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";

interface AdvancesContentProps {
  initialAdvances: DriverAdvance[];
  drivers: Driver[];
}

export default function AdvancesContent({
  initialAdvances,
  drivers,
}: AdvancesContentProps) {
  const [advances, setAdvances] = useState<DriverAdvance[]>(initialAdvances);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSettlementModalOpen, setIsSettlementModalOpen] = useState(false);
  const [selectedAdvance, setSelectedAdvance] = useState<DriverAdvance | null>(
    null,
  );
  const [advanceToDelete, setAdvanceToDelete] = useState<DriverAdvance | null>(
    null,
  );

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  // Filter advances
  const filteredAdvances = advances.filter((advance) => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (!advance.driverName.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    // Date range filter
    if (dateRange?.from && dateRange?.to) {
      const advanceDateParts = advance.date.split(" ");
      const day = parseInt(advanceDateParts[1].replace(",", ""));
      const monthMap: { [key: string]: number } = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      };
      const month = monthMap[advanceDateParts[0]];
      const year = parseInt(advanceDateParts[2]);
      const advanceDate = new Date(year, month, day);

      if (!(advanceDate >= dateRange.from && advanceDate <= dateRange.to)) {
        return false;
      }
    }

    // Status filter
    if (selectedStatuses.length > 0) {
      if (!selectedStatuses.includes(advance.status)) {
        return false;
      }
    }

    return true;
  });

  const handleCreateAdvance = (data: {
    driverId: number;
    driverName: string;
    date: Date;
    amount: number;
  }) => {
    const newAdvance: DriverAdvance = {
      id: advances.length + 1,
      driverId: data.driverId,
      driverName: data.driverName,
      date: format(data.date, "MMM dd, yyyy"),
      advanceAmount: data.amount,
      status: "Active",
      paidToRestaurants: 0,
      collectedFromCustomers: 0,
      expectedReturn: 0,
    };

    setAdvances([newAdvance, ...advances]);
    toast.success("Advance created successfully", {
      description: `Created advance for ${data.driverName}`,
    });
  };

  const handleSettle = (advance: DriverAdvance) => {
    setSelectedAdvance(advance);
    setIsSettlementModalOpen(true);
  };

  const handleSubmitSettlement = (data: {
    amountReturned: number;
    notes: string;
  }) => {
    if (selectedAdvance) {
      setAdvances(
        advances.map((adv) =>
          adv.id === selectedAdvance.id
            ? { ...adv, status: "Settled" as const }
            : adv,
        ),
      );
      toast.success("Settlement completed successfully!", {
        description: `Settled advance for ${selectedAdvance.driverName}`,
      });
      setSelectedAdvance(null);
    }
  };

  const handleDelete = (advance: DriverAdvance) => {
    setAdvanceToDelete(advance);
  };

  const handleConfirmDelete = async () => {
    if (advanceToDelete) {
      setAdvances(advances.filter((adv) => adv.id !== advanceToDelete.id));
      setAdvanceToDelete(null);
    }
  };

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const handleExport = () => {
    toast.success("Exporting data...", {
      description: "Your export will be ready shortly",
    });
  };

  const columns = createColumns(handleSettle, handleDelete);

  return (
    <div className="w-full mb-7 space-y-4">
      {/* Header */}
      <AdvancesHeader
        onCreateClick={() => setIsCreateModalOpen(true)}
        onExportClick={handleExport}
      />

      {/* Filters and Table */}
      <div className="flex flex-col gap-1 flex-wrap bg-white dark:bg-gray-900 p-5 rounded-lg">
        <AdvancesFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedStatuses={selectedStatuses}
          onStatusToggle={handleStatusToggle}
        />

        {/* Table */}
        <AdvancesTable
          columns={columns}
          data={filteredAdvances}
        />
      </div>

      {/* Modals */}
      <CreateAdvanceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        drivers={drivers}
        onSubmit={handleCreateAdvance}
      />

      <SettlementModal
        isOpen={isSettlementModalOpen}
        onClose={() => {
          setIsSettlementModalOpen(false);
          setSelectedAdvance(null);
        }}
        advance={selectedAdvance}
        onSubmit={handleSubmitSettlement}
      />

      {/* Delete Confirmation Dialog */}
      {advanceToDelete && (
        <DeleteConfirmationDialog
          trigger={<div />}
          title="Delete Advance"
          itemName={`Advance for ${advanceToDelete.driverName}`}
          itemType="Advance"
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
