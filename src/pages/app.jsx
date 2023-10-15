import { GOOGLE_PLAY_STORE_URL } from "constants/config";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AppPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(GOOGLE_PLAY_STORE_URL);
  }, []);

  return null;
}
