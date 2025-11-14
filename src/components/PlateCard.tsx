import { PlateRecord } from "@/types/plate";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlateCardProps {
  record: PlateRecord;
  onDelete: (plate: string) => void;
}

export const PlateCard = ({ record, onDelete }: PlateCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Mini Polish Plate */}
          <div className="flex items-center gap-0 bg-gradient-to-b from-[#e8e8e8] to-[#d4d4d4] border-2 border-black rounded overflow-hidden shadow-md">
            <div className="w-7 h-9 bg-[#0033A0] flex flex-col items-center justify-between py-1">
              <div className="flex flex-col w-5 h-4 border border-black/20 rounded-[2px] overflow-hidden">
                <div className="h-1/2 bg-white"></div>
                <div className="h-1/2 bg-[#DC143C]"></div>
              </div>
              <span className="text-[8px] font-bold text-white">PL</span>
            </div>
            <div className="px-2 h-9 flex items-center">
              <span 
                className="text-lg font-black text-black" 
                style={{ 
                  fontFamily: "'Arial Black', sans-serif",
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                {record.plate}
              </span>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(record.plate)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-1 text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span>Added:</span>
          <span className="font-medium text-foreground">
            {formatDistanceToNow(new Date(record.firstAdded), { addSuffix: true })}
          </span>
        </div>
        
        {record.attemptCount > 1 && (
          <>
            <div className="flex justify-between">
              <span>Last attempt:</span>
              <span className="font-medium text-foreground">
                {formatDistanceToNow(new Date(record.lastAttempt), { addSuffix: true })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Attempts:</span>
              <span className="font-medium text-accent">{record.attemptCount}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
