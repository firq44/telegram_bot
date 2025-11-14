import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlateCard } from "@/components/PlateCard";
import { getPlates, deletePlate } from "@/utils/plateStorage";
import { exportToExcel } from "@/utils/excelExport";
import { PlateRecord } from "@/types/plate";
import { toast } from "sonner";

const PlateList = () => {
  const [plates, setPlates] = useState<PlateRecord[]>([]);

  const loadPlates = () => {
    setPlates(getPlates());
  };

  useEffect(() => {
    loadPlates();
  }, []);

  const handleDelete = (plate: string) => {
    deletePlate(plate);
    loadPlates();
    toast.success("Plate deleted");
  };

  const handleExport = () => {
    if (plates.length === 0) {
      toast.error("No plates to export");
      return;
    }
    exportToExcel(plates);
    toast.success("Exported to Excel");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Saved Plates</h1>
              <p className="text-muted-foreground">All saved license plates</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={handleExport}
              disabled={plates.length === 0}
            >
              <Download className="h-4 w-4" />
              Export to Excel
            </Button>
            
            <Link to="/">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New
              </Button>
            </Link>
          </div>
        </div>

        {plates.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚗</div>
            <h2 className="text-xl font-semibold text-foreground mb-2">No saved plates</h2>
            <p className="text-muted-foreground mb-6">Add your first license plate</p>
            <Link to="/">
              <Button>Add Plate</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {plates.map((record) => (
              <PlateCard key={record.plate} record={record} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlateList;
