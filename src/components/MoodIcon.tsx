
import { Smile, HeartHandshake, Waves, Frown, Bird, Flame, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoodIconProps {
  mood: 'joyful' | 'grateful' | 'calm' | 'sad' | 'anxious' | 'angry' | 'neutral';
  className?: string;
}

const MoodIcon = ({ mood, className }: MoodIconProps) => {
  const moodMap = {
    joyful: { icon: Smile, color: 'text-mood-joyful' },
    grateful: { icon: HeartHandshake, color: 'text-mood-grateful' },
    calm: { icon: Waves, color: 'text-mood-calm' },
    sad: { icon: Frown, color: 'text-mood-sad' },
    anxious: { icon: Bird, color: 'text-mood-anxious' },
    angry: { icon: Flame, color: 'text-mood-angry' },
    neutral: { icon: CircleDot, color: 'text-mood-neutral' }
  };

  const { icon: Icon, color } = moodMap[mood];

  return <Icon className={cn("h-4 w-4", color, className)} />;
};

export default MoodIcon;
