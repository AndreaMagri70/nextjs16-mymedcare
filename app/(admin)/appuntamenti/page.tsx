"use client";

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Aggiungi questa funzione PRIMA del componente
const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'confirmed':
      return 'default'
    case 'pending':
      return 'secondary'
    case 'cancelled':
      return 'destructive'
    case 'completed':
      return 'outline'
    default:
      return 'outline'
  }
}


export default function AppointmentAdmin() {
    const appointments = useQuery(api.appointments.getAppointments);
    const updateStatus = useMutation(api.appointments.updateStatus);

    const handleStatusUpdate = async (
        id: Id<"appointments">,
        status: "confirmed" | "cancelled" | "completed"
    ) => {
        await updateStatus({ appointmentId: id, status });
    }

    if (!appointments) {
        return <div className="p-10 text-center">Loading appointments...</div>;
    }

  return (
    <div className="container mx-auto p-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appointments?.map((apt) => (
            <TableRow key={apt._id}>
              <TableCell className="font-medium">
                {new Date(apt.date).toLocaleString()}
              </TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{apt.patient?.name || "Unknown"}</span>
                  <span className="text-sm text-muted-foreground">
                    {apt.patient?.email}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                Dr. {apt.doctor?.name || "Unassigned"}
              </TableCell>

              <TableCell>
                {apt.department}
              </TableCell>

              <TableCell>
                <Badge variant={getStatusVariant(apt.status)}>
                  {apt.status}
                </Badge>
              </TableCell>

              <TableCell>
                {apt.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleStatusUpdate(apt._id, "confirmed")}
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={() => handleStatusUpdate(apt._id, "cancelled")}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {apt.status === 'confirmed' && (
                  <Button
                    onClick={() => handleStatusUpdate(apt._id, "completed")}
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Mark Complete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
     );
}