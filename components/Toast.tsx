import { ToastContentProps } from "react-toastify";
import { Montserrat } from "next/font/google";
import { Icon } from "@iconify/react";

const montserrat = Montserrat({ subsets: ["latin"] });

type CustomNotificationProps = ToastContentProps<{
  title: string;
  content: string;
  success: boolean;
}>;
export default function TemplateToast({ data }: CustomNotificationProps) {
  return (
    <div className={`text-sm ${montserrat.className} flex items-center gap-4`}>
      {data.success ? (
        <Icon
          icon="lets-icons:check-fill"
          fontSize={36}
          className="text-accent"
        />
      ) : (
        <Icon
          icon="material-symbols:error"
          fontSize={36}
          className="text-danger"
        />
      )}
      <div>
        <p className="font-bold">{data.title}</p>
        <p className="text-foreground/80">{data.content}</p>
      </div>
    </div>
  );
}
