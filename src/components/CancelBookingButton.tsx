/** @format */
"use client";

import { useState } from "react";
import { deleteBooking } from "@/lib/services/bookingAction"; 
import { toast } from "sonner";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CancelButtonProps {
  bookingId: string;
}

export default function CancelBookingButton({ bookingId }: CancelButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancel = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteBooking(bookingId);

      if (result.success) {
        toast.success("Reservation Canceled", {
          description: "Your booking has been successfully removed from our records.",
        });
      } else {
        toast.error("Cancellation Failed", {
          description: result.error,
        });
      }
    } catch (error) {
      toast.error("Unexpected Error", {
        description: "Please try again later or contact support.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      {/* Trigger Button */}
      <AlertDialogTrigger asChild>
        <button
          disabled={isDeleting}
          className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border border-red-100 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isDeleting ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Trash2 size={14} className="group-hover:animate-bounce" />
          )}
          {isDeleting ? "Processing..." : "Cancel Reservation"}
        </button>
      </AlertDialogTrigger>

      {/* Modern Confirmation Modal */}
      <AlertDialogContent className="rounded-[2.5rem] border-none shadow-2xl bg-white p-10 max-w-[400px]">
        <AlertDialogHeader className="flex flex-col items-center">
          <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="text-red-500" size={40} />
          </div>
          <AlertDialogTitle className="text-2xl font-black text-slate-900 text-center tracking-tight">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500 text-center text-sm font-medium leading-relaxed mt-2">
            This action cannot be undone. This will permanently delete your reservation from our sanctuary records.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 mt-10 w-full">
          <AlertDialogCancel className="flex-1 rounded-2xl border-slate-100 py-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
            Nevermind
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            className="flex-1 rounded-2xl bg-red-500 py-6 font-black text-[10px] uppercase tracking-[0.2em] text-white hover:bg-red-600 shadow-xl shadow-red-100 transition-all"
          >
            Confirm Cancellation
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}