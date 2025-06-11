import { Wifi, Droplets, Snowflake, ChefHat, ParkingCircle, Dumbbell, CheckCircle2, Tv, WashingMachine, Coffee, Heater, Utensils } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


interface AmenityIconProps extends LucideProps {
  amenity: string;
  showTooltip?: boolean;
}

const AmenityIcon: React.FC<AmenityIconProps> = ({ amenity, size = 24, className, showTooltip = false, ...props }) => {
  let IconComponent;
  switch (amenity.toLowerCase()) {
    case 'wifi':
      IconComponent = Wifi;
      break;
    case 'pool':
      IconComponent = Droplets;
      break;
    case 'air conditioning':
    case 'ac':
      IconComponent = Snowflake;
      break;
    case 'kitchen':
      IconComponent = Utensils;
      break;
    case 'parking':
      IconComponent = ParkingCircle;
      break;
    case 'gym':
      IconComponent = Dumbbell;
      break;
    case 'tv':
    case 'cable tv':
      IconComponent = Tv;
      break;
    case 'washing machine':
      IconComponent = WashingMachine;
      break;
    case 'coffee maker':
      IconComponent = Coffee;
      break;
    case 'heating':
      IconComponent = Heater;
      break;
    case 'workspace': // Assuming a generic icon for workspace
      IconComponent = CheckCircle2; // Or a more specific one if available like Laptop
      break;
    case 'elevator':
      IconComponent = CheckCircle2; // Placeholder, Lucide doesn't have a direct elevator icon
      break;
     case 'garden':
      IconComponent = CheckCircle2; // Placeholder, could use Leaf
      break;
    case 'hot tub':
      IconComponent = CheckCircle2; // Placeholder
      break;
    case 'rooftop terrace':
      IconComponent = CheckCircle2; // Placeholder
      break;
    case 'pet friendly':
      IconComponent = CheckCircle2; // Placeholder, could use PawPrint
      break;
    default:
      IconComponent = CheckCircle2;
  }

  const iconElement = <IconComponent size={size} className={className} {...props} />;

  if (showTooltip) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-block p-1 rounded-md hover:bg-accent/20 transition-colors">{iconElement}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{amenity}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return iconElement;
};

export default AmenityIcon;
