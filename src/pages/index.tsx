import { useRouter } from "next/router";

import EmailForm from "@/components/EmailForm";

import styles from "@/styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const handleSubmit = (email: string) => {
    router.push("/exchange-rate");
  };

  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <EmailForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
