import { PlateRecord } from "@/types/plate";

export const exportToExcel = (plates: PlateRecord[]) => {
  // Create CSV content
  const headers = ["License Plate", "First Added", "Last Attempt", "Attempt Count"];
  const csvContent = [
    headers.join(","),
    ...plates.map(record => [
      record.plate,
      new Date(record.firstAdded).toLocaleString("en-US"),
      new Date(record.lastAttempt).toLocaleString("en-US"),
      record.attemptCount
    ].join(","))
  ].join("\n");

  // Create blob and download
  const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `license_plates_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
