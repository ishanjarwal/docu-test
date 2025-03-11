import { SubscriptionLevel } from "@/features/premium/actions";

interface PremiumFeatures {
  canUseAI: boolean;
  canUseCustomizations: boolean;
  resumeLimit: number;
  removeWatermark: boolean;
}

const usePremiumFeatures = (
  subscriptionLevel: SubscriptionLevel,
): PremiumFeatures => {
  switch (subscriptionLevel) {
    case "free":
      return {
        canUseAI: false,
        canUseCustomizations: false,
        resumeLimit: 1,
        removeWatermark: false,
      };
    case "hobby":
      return {
        canUseAI: false,
        canUseCustomizations: true,
        resumeLimit: 3,
        removeWatermark: true,
      };
    case "pro":
      return {
        canUseAI: true,
        canUseCustomizations: true,
        resumeLimit: 10,
        removeWatermark: true,
      };
    default:
      return {
        canUseAI: false,
        canUseCustomizations: false,
        resumeLimit: 1,
        removeWatermark: false,
      };
  }
};

export default usePremiumFeatures;
