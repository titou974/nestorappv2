import styles from "@/components/style";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ValetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      data-theme="nestor-dark"
      className="min-h-screen bg-background text-foreground dark"
    >
      <meta name="theme-color" content="#000000" />
      <ToastContainer position="top-center" autoClose={4000} hideProgressBar />
      <div
        className={`${styles.padding} flex flex-col justify-start relative mx-auto min-h-screen max-w-screen-sm`}
      >
        {children}
      </div>
    </div>
  );
}
