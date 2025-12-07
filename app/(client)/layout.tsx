import styles from "@/components/style";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      data-theme="nestor"
      className="min-h-screen w-full bg-background text-foreground"
    >
      <meta name="theme-color" content="#e7e7e7" />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div
        className={`${styles.padding} relative mx-auto flex min-h-screen max-w-screen-sm flex-col justify-start gap-10`}
      >
        {children}
      </div>
    </div>
  );
}
