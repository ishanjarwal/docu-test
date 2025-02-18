import { SubscriptionLevel } from "@/features/premium/actions";

interface PremiumFeatures {
  canUseAI: boolean;
  canUseCustomizations: boolean;
  resumeLimit: number;
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
      };
    case "hobby":
      return {
        canUseAI: false,
        canUseCustomizations: true,
        resumeLimit: 3,
      };
    case "pro":
      return {
        canUseAI: true,
        canUseCustomizations: true,
        resumeLimit: 10,
      };
    default:
      return {
        canUseAI: false,
        canUseCustomizations: false,
        resumeLimit: 1,
      };
  }
};

export default usePremiumFeatures;
