import { Manager, UnassignedDriver, AssignedDriver } from "@/types/entities";

// Mock data for managers
export const managersData: Manager[] = [
  {
    id: 1,
    fullName: "John Smith",
    email: "john.smith@example.com",
    assignedDrivers: 8,
    status: "high",
  },
  {
    id: 2,
    fullName: "Sarah Johnson",
    email: "sarah.j@example.com",
    assignedDrivers: 3,
    status: "low",
  },
  {
    id: 3,
    fullName: "Michael Chen",
    email: "m.chen@example.com",
    assignedDrivers: 6,
    status: "high",
  },
  {
    id: 4,
    fullName: "Emily Davis",
    email: "emily.davis@example.com",
    assignedDrivers: 2,
    status: "low",
  },
  {
    id: 5,
    fullName: "Robert Wilson",
    email: "r.wilson@example.com",
    assignedDrivers: 7,
    status: "high",
  },

];

// Mock data for unassigned drivers
export const unassignedDriversData: UnassignedDriver[] = [
  {
    id: 101,
    fullName: "Ahmed Hassan",
    email: "ahmed.h@example.com",
  },
  {
    id: 102,
    fullName: "Mohammed Ali",
    email: "mohammed.a@example.com",
  },
  {
    id: 103,
    fullName: "Fatima Ibrahim",
    email: "fatima.i@example.com",
  },
  {
    id: 104,
    fullName: "Omar Khalid",
    email: "omar.k@example.com",
  },
  {
    id: 105,
    fullName: "Aisha Mohamed",
    email: "aisha.m@example.com",
  },
  {
    id: 106,
    fullName: "Yusuf Ahmed",
    email: "yusuf.a@example.com",
  },
  {
    id: 107,
    fullName: "Zainab Hassan",
    email: "zainab.h@example.com",
  },
  {
    id: 108,
    fullName: "Ibrahim Saleh",
    email: "ibrahim.s@example.com",
  },
  {
    id: 109,
    fullName: "Maryam Ali",
    email: "maryam.a@example.com",
  },
  {
    id: 110,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 111,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 112,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 113,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 114,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 115,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 116,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 117,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 118,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 119,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 120,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 121,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 122,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 123,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 124,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 125,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 126,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 127,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 128,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 129,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
  {
    id: 130,
    fullName: "Khalid Omar",
    email: "khalid.o@example.com",
  },
];

// Mock data for all assigned drivers
export const assignedDriversData: AssignedDriver[] = [
  {
    id: 317,
    fullName: "jitu",
    email: "jnkop@gmail.com",
    contactNo: "9999999999",
    stateId: "Active",
    assignedTo: "yusra muhaba",
    assignedToId: 1,
    joinedDate: "Jul 31, 2025",
  },
  {
    id: 319,
    fullName: "Notification tester",
    email: "1100583344@gmail.com",
    contactNo: "1100583344",
    stateId: "Active",
    assignedTo: "yusra muhaba",
    assignedToId: 1,
    joinedDate: "Jul 31, 2025",
  },
  {
    id: 323,
    fullName: "Push notification",
    email: "push@gmail.com",
    contactNo: "9988776655",
    stateId: "Active",
    assignedTo: "yusra muhaba",
    assignedToId: 1,
    joinedDate: "Jul 31, 2025",
  },
  {
    id: 324,
    fullName: "Ali Reza",
    email: "ali.reza@gmail.com",
    contactNo: "9876543210",
    stateId: "Active",
    assignedTo: "Sarah Johnson",
    assignedToId: 2,
    joinedDate: "Aug 15, 2025",
  },
  {
    id: 325,
    fullName: "Hassan Ahmed",
    email: "hassan.a@gmail.com",
    contactNo: "9988776644",
    stateId: "Active",
    assignedTo: "Michael Chen",
    assignedToId: 3,
    joinedDate: "Aug 20, 2025",
  },
];

export const getManagerById = (id: number): Manager | undefined => {
  return managersData.find((m) => m.id === id);
};

export const getManagerDrivers = (managerId: number): AssignedDriver[] => {
  return assignedDriversData.filter((d) => d.assignedToId === managerId);
};

export const getManagerMetrics = (managerId: number) => {
  const drivers = getManagerDrivers(managerId);
  const totalDrivers = drivers.length;
  const activeDrivers = drivers.filter((d) => d.stateId === "Active").length;
  // Mock calculation for recent drivers (joined within last 30 days)
  const recentDrivers = drivers.filter((d) => {
    const joinedDate = new Date(d.joinedDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return joinedDate >= thirtyDaysAgo;
  }).length;
  
  const totalSystemDrivers = assignedDriversData.length + unassignedDriversData.length;
  const percentageOfTotal = totalSystemDrivers > 0 
    ? ((totalDrivers / totalSystemDrivers) * 100).toFixed(1) 
    : "0.0";

  return {
    assignedDrivers: totalDrivers,
    totalDrivers,
    activeDrivers,
    recentDrivers,
    percentageOfTotal: `${percentageOfTotal}%`
  };
};
