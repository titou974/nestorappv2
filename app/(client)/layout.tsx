import styles from "@/components/style";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div
      data-theme="nestor"
      className="min-h-screen w-full bg-background text-foreground"
    >
      <meta name="theme-color" content="#e7e7e7" />
      <ToastContainer position="top-center" hideProgressBar autoClose={4000} />
      <div
        className={`${styles.padding} relative mx-auto flex min-h-screen max-w-screen-sm flex-col justify-start gap-10`}
      >
        {children}
      </div>
    </div>
  );
}
