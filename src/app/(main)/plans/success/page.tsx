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
  try {
    const result = await retrieveCheckoutSession();
    if (!result || result.error) {
      redirect("/plans");
    } else {
      return <SuccessComponent session_id={result.success!} />;
    }
  } catch (error) {
    console.log(error);
    redirect("/plans");
  }
};

export default SuccessPage;
