import PageLoader from "@/components/loaders/PageLoader";
const loading = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center">
      <PageLoader />
    </div>
  );
};

export default loading;
