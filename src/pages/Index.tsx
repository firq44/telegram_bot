import { useState } from "react";
import { Link } from "react-router-dom";
import { List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LicensePlateInput } from "@/components/LicensePlateInput";
import { savePlate } from "@/utils/plateStorage";
import { toast } from "sonner";

const Index = () => {
  const [plateValue, setPlateValue] = useState("");

  const handleSubmit = () => {
    if (!plateValue || plateValue.length < 3) {
      toast.error("Enter a valid license plate number");
      return;
    }

    const { isDuplicate, record } = savePlate(plateValue.trim());

    if (isDuplicate) {
      toast.warning(
        `Plate already exists! Added on ${new Date(record.firstAdded).toLocaleDateString("en-US")}. Attempt #${record.attemptCount}`,
        { duration: 5000 }
      );
    } else {
      toast.success("Plate added successfully!");
      setPlateValue("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Plate Registry 🇵🇱
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter a Polish license plate number
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-xl">
            <div className="mb-6">
              <label className="block text-sm font-medium text-muted-foreground mb-3">
                License Plate Number
              </label>
              <LicensePlateInput
                value={plateValue}
                onChange={setPlateValue}
                onSubmit={handleSubmit}
              />
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleSubmit}
                className="w-full h-12 text-lg"
                disabled={!plateValue || plateValue.length < 3}
              >
                Add Plate
              </Button>

              <Link to="/plates" className="block">
                <Button variant="outline" className="w-full h-12 gap-2">
                  <List className="h-5 w-5" />
                  View Saved Plates
                </Button>
              </Link>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>How to use:</strong> Enter 2-3 letters, then numbers and optionally a final letter (e.g., SR 4657C)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
