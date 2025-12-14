import LoadingModal from "@/components/home/LoadingModal";
import Navbar from "@/components/Navbar";
import { StringsFR } from "@/constants/fr_string";
import { Site } from "@/types/site";

export default function CreateTicket({ siteData }: { siteData: Site }) {
  return (
    <>
      <Navbar
        subtitle={StringsFR.welcomeTo}
        title={siteData.name}
        transparent
      />
      <LoadingModal isOpen={true} title={StringsFR.creationOfYourTicket} />
    </>
  );
}
