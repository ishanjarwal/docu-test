import { useEffect, useState } from "react";

const usePhotoURL = (photo: File | null | undefined | string) => {
  const [photoURL, setPhotoURL] = useState(photo instanceof File ? "" : photo);
  useEffect(() => {
    const objectURL = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectURL) setPhotoURL(objectURL);
    if (photo === null) setPhotoURL("");
    return () => URL.revokeObjectURL(objectURL);
  }, [photo]);

  return photoURL;
};

export default usePhotoURL;
