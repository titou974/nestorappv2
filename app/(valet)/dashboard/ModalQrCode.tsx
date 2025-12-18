import { StringsFR } from "@/constants/fr_string";
import { ROUTES } from "@/constants/routes";
import { buildRouteWithParams } from "@/lib/buildroutewithparams";
import { Button, Modal } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useQRCode } from "next-qrcode";

export default function ModalQrCode({
  siteName,
  siteId,
}: {
  siteName: string;
  siteId: string;
}) {
  const { SVG } = useQRCode();
  const baseUrl = process.env.NEXT_PUBLIC_URL
    ? `https://${process.env.NEXT_PUBLIC_URL}`
    : "";
  const newTicketRoute = buildRouteWithParams(baseUrl + ROUTES.NEW_TICKET, {
    site: siteId,
  });
  return (
    <Modal>
      <Button className="w-full" variant="tertiary">
        {StringsFR.showQrCode}
        <Icon icon="tabler:qrcode" className="size-6" />
      </Button>
      <Modal.Container
        placement="center"
        variant="blur"
        data-theme="nestor-dark"
      >
        <Modal.Dialog className="sm:max-w-[360px] gap-2">
          {({ close }) => (
            <>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading className="text-center space-y-2">
                  <p>
                    {StringsFR.welcomeTo} {siteName}
                  </p>
                  <p className="text-foreground/80 text-sm">
                    {StringsFR.mayScanQrCode}
                  </p>
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="flex justify-center overflow-hidden">
                <SVG
                  text={newTicketRoute}
                  options={{
                    margin: 2,
                    width: 340,

                    color: {
                      dark: "#fff",
                      light: "#27272a",
                    },
                  }}
                />
              </Modal.Body>
            </>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
}
