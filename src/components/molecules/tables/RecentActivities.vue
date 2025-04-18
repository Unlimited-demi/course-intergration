<template>
  <Card class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl text-gray-600">Recent Activity</h2>
      <Button variant="link" class="text-primary gap-2 hover:no-underline">
        View All
        <ChevronRight class="h-4 w-4" />
      </Button>
    </div>

    <div class="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[250px]">Name</TableHead>
            <TableHead class="min-w-[200px]">Training</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="w-[70px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="activity in activities" :key="activity.id">
            <TableCell>
              <div class="flex items-center gap-3">
                <img
                  :src="activity.avatar || '/placeholder.svg'"
                  :alt="activity.name"
                  width="40"
                  height="40"
                  class="rounded-full"
                />
                <div>
                  <div class="font-medium">{{ activity.name }}</div>
                  <div class="text-sm text-gray-500">
                    User ID #{{ activity.userId }}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{{ activity.training }}</TableCell>
            <TableCell>₦{{ activity.amount.toLocaleString() }}</TableCell>
            <TableCell>{{ activity.date }}</TableCell>
            <TableCell>
              <span
                :class="statusStyles[activity.status]"
                class="inline-block px-3 py-1 rounded-full text-sm"
              >
                {{ activity.status }}
              </span>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" class="h-8 w-8">
                    <MoreVertical class="h-4 w-4" />
                    <span class="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Update status</DropdownMenuItem>
                  <DropdownMenuItem>Remove entry</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </Card>
</template>

<script setup>
import { MoreVertical, ChevronRight } from "lucide-vue-next";
import { Card } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";

// Activity data
const activities = [
  {
    id: "1",
    name: "Favour John",
    userId: "2795490",  
    avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj4KICA8cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNjY2NjY2MiPjwvcmVjdD4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyNnB4IiBmaWxsPSIjMzMzMzMzIj40MHg0MDwvdGV4dD4gICAKPC9zdmc+",
    training: "User-Centered Principle",
    amount: 25000,
    date: "07/10/2024",
    status: "Successful",
  },
  {
    id: "2",
    name: "Uzoma Chika",
    userId: "4595481",
    avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj4KICA8cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNjY2NjY2MiPjwvcmVjdD4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyNnB4IiBmaWxsPSIjMzMzMzMzIj40MHg0MDwvdGV4dD4gICAKPC9zdmc+",
    training: "Design of Everyday Things",
    amount: 75000,
    date: "31/09/2024",
    status: "Pending",
  },
  {
    id: "3",
    name: "Lewis Andre",
    userId: "4595481",
    avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj4KICA8cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNjY2NjY2MiPjwvcmVjdD4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyNnB4IiBmaWxsPSIjMzMzMzMzIj40MHg0MDwvdGV4dD4gICAKPC9zdmc+",
    training: "Introduction to Cybersecurity",
    amount: 45000,
    date: "25/08/2024",
    status: "Failed",
  },
];

// Status styling
const statusStyles = {
  Successful: "bg-green-100 text-green-600",
  Pending: "bg-orange-100 text-orange-600",
  Failed: "bg-red-100 text-red-600",
};
</script>

<style scoped>
/* You can add scoped styles here if necessary */
</style>
