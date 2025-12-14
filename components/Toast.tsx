import { ToastContentProps } from "react-toastify";
import cx from "clsx";
import { Montserrat } from "next/font/google";
import { Icon } from "@iconify/react";

const montserrat = Montserrat({ subsets: ["latin"] });

type CustomNotificationProps = ToastContentProps<{
  title: string;
  content: string;
}>;
export default function TemplateToast({
  closeToast,
  data,
}: CustomNotificationProps) {
  return (
    <div className={`text-sm ${montserrat.className} flex items-center gap-4`}>
      <Icon
        icon="lets-icons:check-fill"
        fontSize={36}
        className="text-accent"
      />
      <div>
        <p className="font-bold">{data.title}</p>
        <p className="text-foreground/80">{data.content}</p>
      </div>
    </div>
  );
}
