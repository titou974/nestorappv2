"use client";
import FooterBarLayout from "@/components/layouts/footerbarlayout";
import { StringsFR } from "@/constants/fr_string";
import { ROUTES } from "@/constants/routes";
import { buildRouteWithParams } from "@/lib/buildroutewithparams";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function FooterBar({ siteId }: { siteId: string }) {
  const router = useRouter();

  return (
    <FooterBarLayout>
      <Button
        type="submit"
        className="w-full"
        onClick={() =>
          router.push(
            buildRouteWithParams(ROUTES.SIGNIN, {
              site: siteId,
            })
          )
        }
      >
        {StringsFR.login}
      </Button>
      <Button
        className="w-full"
        variant="ghost"
        onClick={() =>
          router.push(
            buildRouteWithParams(ROUTES.REGISTER, {
              site: siteId,
            })
          )
        }
      >
        {StringsFR.createYourAccount}
        <ArrowRightIcon width={20} />
      </Button>
    </FooterBarLayout>
  );
}
