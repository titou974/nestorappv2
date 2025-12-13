import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Img,
  Link,
  Text,
  Hr,
  Tailwind,
} from "@react-email/components";
import { formatDayDateToFrench } from "@/lib/formatdate";
import { cguContent, main } from "@/constants";
import { EmailProps } from "@/types/site";
import { StringsFR } from "@/constants/fr_string";

const EmailTemplate = ({
  siteName,
  scannedAt,
  ticketPrice,
  ticketNumber,
  companyCgu,
  email,
}: EmailProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL
    ? `https://${process.env.NEXT_PUBLIC_URL}`
    : "";

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body style={main}>
          <Preview>{StringsFR.emailTitle}</Preview>
          <Container className="mx-auto px-0 pt-5 pb-12 w-[660px] max-w-full">
            <Section>
              <Row>
                <Column>
                  <Img
                    src={`${baseUrl}/nestortransparent.png`}
                    width="100"
                    height="100"
                    alt="Nestor Logo"
                  />
                </Column>

                <Column align="right" className="table-cell">
                  <Text className="text-[32px] font-light text-[#888888] my-4 leading-6">
                    {StringsFR.invoiceDetails}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section>
              <Text className="text-center m-0 mt-9 mb-10 text-[14px] leading-6 font-medium text-[#111111]">
                {StringsFR.thanksForUsingNestor}
              </Text>
            </Section>
            <Section className="border-collapse border-spacing-0 text-[#333333] bg-[#fafafa] rounded-md text-[12px]">
              <Row className="min-h-[46px]">
                <Column colSpan={2}>
                  <Section>
                    <Row>
                      <Column className="pl-5 border-solid border-white border-0 border-r border-b min-h-11 ">
                        <Text className="m-0 p-0 text-[#666666] text-2.5 leading-[1.4]">
                          {StringsFR.email}
                        </Text>
                        <Link className="m-0 p-0 text-[#15c] underline text-[12px] leading-[1.4]">
                          {email}
                        </Link>
                      </Column>
                    </Row>

                    <Row>
                      <Column className="pl-5 border-solid border-white border-0 border-r border-b min-h-11">
                        <Text className="m-0 p-0 text-[#666666] text-2.5 leading-[1.4]">
                          {StringsFR.invoiceDate}
                        </Text>
                        <Text className="m-0 p-0 text-[12px] leading-[1.4]">
                          {formatDayDateToFrench(scannedAt)}
                        </Text>
                      </Column>
                    </Row>

                    <Row>
                      <Column className="pl-5 border-solid border-white border-0 border-r border-b min-h-11">
                        <Text className="m-0 p-0 text-[#666666] text-2.5 leading-[1.4]">
                          {StringsFR.ticketId}
                        </Text>
                        <Text className="m-0 p-0 text-[#15c] underline text-[12px] leading-[1.4]">
                          {StringsFR.hashtag}
                          {ticketNumber}
                        </Text>
                      </Column>
                    </Row>
                  </Section>
                </Column>
                <Column
                  className="pl-5 border-solid border-white border-0 border-r border-b min-h-11"
                  colSpan={2}
                >
                  <Text className="m-0 p-0 text-[#666666] text-2.5 leading-[1.4]">
                    {StringsFR.place}
                  </Text>
                  <Text className="m-0 p-0 text-[12px] leading-[1.4]">
                    {siteName}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className="border-collapse border-spacing-0 text-[#333333] bg-[#fafafa] rounded-md text-[12px] mt-[30px] mb-[15px] min-h-6">
              <Text className="bg-[#fafafa] pl-2.5 text-sm leading-6 font-medium m-0">
                {StringsFR.yourReceipt}
              </Text>
            </Section>
            <Section>
              <Row>
                <Column className="pl-[22px]">
                  <Text className="text-xs font-semibold m-0 p-0 leading-[1.4]">
                    {StringsFR.valetService}
                    <sup className="text-black font-medium">
                      {StringsFR.asterisk}
                    </sup>
                  </Text>
                  <Text className="text-xs text-[#666666] m-0 p-0 leading-[1.4]">
                    {siteName}
                  </Text>
                  <Link
                    href="https://tally.so/r/3qKl18"
                    className="text-[12px] text-accent no-underline"
                  >
                    {StringsFR.problemClickHere}
                  </Link>
                </Column>

                <Column
                  className="table-cell pr-5 w-[100px] align-top"
                  align="right"
                >
                  <Text className="text-[12px] leading-6 font-semibold m-0">
                    {ticketPrice}
                    {StringsFR.asterisk}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Hr className="mt-[30px] mb-0" />
            <Section align="right">
              <Row>
                <Column className="table-cell" align="right">
                  <Text className="m-0 text-[#666666] text-2.5 font-semibold p-0 pr-[30px] text-right">
                    {StringsFR.total}
                  </Text>
                </Column>
                <Column className="min-h-12 pt-12 [border-left:1px_solid_rgb(238,238,238)]" />
                <Column className="table-cell w-[90px]">
                  <Text className="text-base font-semibold whitespace-nowrap m-0 mr-5 text-right">
                    {ticketPrice}
                    {StringsFR.euro}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Hr className="mb-[75px]" />
            <Text className="text-[12px] leading-[normal] text-[#666666] m-0 mb-1 mt-5">
              {StringsFR.seeCgu}
            </Text>
            {companyCgu
              ? companyCgu.map((part, index) => (
                  <div key={index}>
                    <Text className="text-[12px] leading-[normal] text-[#666666] m-0 mb-1 mt-5">
                      {part.subtitle}
                    </Text>
                    <Text className="text-[12px] leading-[normal] text-[#666666] m-0 mb-1">
                      {part.text}
                    </Text>
                  </div>
                ))
              : cguContent.map((part, index) => (
                  <div key={index}>
                    <Text className="text-[12px] leading-[normal] text-[#666666] m-0 mb-1 mt-5">
                      {part.subtitle}
                    </Text>
                    <Text className="text-[12px] leading-[normal] text-[#666666] m-0 mb-1">
                      {part.text}
                    </Text>
                  </div>
                ))}
            <Section>
              <Row>
                <Column align="center" className="block mt-10">
                  <Img
                    src={`${baseUrl}/nestoricon.png`}
                    width="26"
                    height="26"
                    alt="Nestor Icon"
                  />
                </Column>
              </Row>
            </Section>
            <Text className="m-0 mt-[25px] text-center text-[12px] leading-6 text-[#666666]">
              {StringsFR.copyright} <br />{" "}
              <Link>{StringsFR.allRightReserved}</Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailTemplate;
