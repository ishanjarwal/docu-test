import { retrieveCheckoutSession } from "@/features/stripe/actions";
import SuccessComponent from "@/features/stripe/components/SuccessComponent";
import { redirect } from "next/navigation";

const SuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { session_id } = await searchParams;
  if (!session_id) {
    redirect("/plans");
  }
  const result = await retrieveCheckoutSession(session_id as string);
  if (!result || result.error || !result.session) {
    return redirect("/plans");
  }
  return <SuccessComponent session={result.session} />;
};

export default SuccessPage;
