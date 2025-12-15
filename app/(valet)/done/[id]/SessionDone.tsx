import ParkAnimation from "@/components/animations/Park";
import Navbar from "@/components/Navbar";
import FooterBar from "./FooterBar";
import { Alert } from "@heroui/react";
import { StringsFR } from "@/constants/fr_string";
import { capitalize } from "@/lib/capitalize";

export default function SessionDone({
  siteName,
  siteId,
  sessionName,
}: {
  siteName: string;
  siteId: string;
  sessionName: string | null;
}) {
  return (
    <>
      <Navbar
        subtitle={`Bravo${sessionName && ` ${capitalize(sessionName)}`}`}
        title={"À bientôt."}
      />
      <ParkAnimation>
        <Alert status="success" className="w-80">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title className="text-foreground">
              {StringsFR.sessionDone}
            </Alert.Title>
            <Alert.Description>
              {StringsFR.yourServiceAt}
              {siteName}
              {StringsFR.isFinished}
            </Alert.Description>
          </Alert.Content>
        </Alert>
      </ParkAnimation>
      <FooterBar siteId={siteId} />
    </>
  );
}
